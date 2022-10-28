---
sidebar_position: 3
description: 介绍MCU的堆栈概念，并介绍堆栈的使用场景
---

# risc-v mcu 的堆栈



RISC-V 32个通用整型寄存器中，有个**ra寄存器**，专门负责保存函数调用时的返回地址。当发生函数调用时，CPU就会自动把调用函数时的下一条指令地址保存在ra寄存器中。

但是，CPU的ra寄存器只有一个，当发生多级函数调用时，怎么办？设计多个ra寄存器？这不现实，因为我们不知道一段程序的运行究竟嵌套调用了多个级函数。这时候聪明的人类就发明了**堆栈**。

## 1. 什么是堆栈？

在嵌入式的世界里，**堆栈**通常指的是**栈**，严格来说，堆栈分为**堆(Heap)**和**栈(Stack)**。

- **栈(Stack)**: 一种顺序数据结构，满足**后进先出**（Last-In / First-Out）的原则，由编译器自动分配和释放。使用一级缓存，调用完立即释放。
- **堆(Heap)**：类似于链表结构，可对任意位置进行操作，通常由程序员手动分配，使用完需及时**释放(free)**，不然容易造成内存泄漏。使用二级缓存。

![text_data_bss](img\text_data_bss.png)



## 2. 堆栈的作用

- 函数调用时，如果函数参数和局部变量很多，寄存器放不下，需要开辟栈空间存储。
- 中断发生时，栈空间用于存放当前执行程序的现场数据（下一条指令地址、各种缓存数据），以便中断结束后恢复现场。

![mcu_call_stack](img\mcu_call_stack.png)

:::tip

使用C语言开发MCU时，一般我们是感受不到堆栈的存在的，因为在编译过程中，编译器会自动根据我们的程序分配堆栈空间。

当使用汇编编程时，就需要我们自己动手管理堆栈。

:::

## 3. 压栈出栈过程

以中断函数为例，
```         c
void HardFault_Handler(void)
{
    0:	7139                addi	sp,sp,-64  # 调整堆栈指针sp
    2:	d62a                sw	a0,44(sp)      # 压栈，保存a0寄存

    // printf("test\r\n");
    4:	00000517          	auipc	a0,0x0
    8:	00050513          	mv	a0,a0


    c:	de06                sw	ra,60(sp)     # 压栈，保存ra寄存
    e:	dc16                sw	t0,56(sp)
    10:	da1a                sw	t1,52(sp)
    12:	d81e                sw	t2,48(sp)
    14:	d42e                sw	a1,40(sp)
    16:	d232                sw	a2,36(sp)
    18:	d036                sw	a3,32(sp)
    1a:	ce3a                sw	a4,28(sp)
    1c:	cc3e                sw	a5,24(sp)
    1e:	ca42                sw	a6,20(sp)
    20:	c846                sw	a7,16(sp)
    22:	c672                sw	t3,12(sp)
    24:	c476                sw	t4,8(sp)
    26:	c27a                sw	t5,4(sp)
    28:	c07e                sw	t6,0(sp)
    
    // printf("test\r\n");
    2a:	00000097          	auipc	ra,0x0
    2e:	000080e7          	jalr	ra # 2a <HardFault_Handler+0x2a>


    32:	50f2                lw	ra,60(sp)    # 出栈，恢复ra寄存器
    34:	52e2                lw	t0,56(sp)    # 出栈，恢复t0寄存器
    36:	5352                lw	t1,52(sp)
    38:	53c2                lw	t2,48(sp)
    3a:	5532                lw	a0,44(sp)
    3c:	55a2                lw	a1,40(sp)
    3e:	5612                lw	a2,36(sp)
    40:	5682                lw	a3,32(sp)
    42:	4772                lw	a4,28(sp)
    44:	47e2                lw	a5,24(sp)
    46:	4852                lw	a6,20(sp)
    48:	48c2                lw	a7,16(sp)
    4a:	4e32                lw	t3,12(sp)
    4c:	4ea2                lw	t4,8(sp)
    4e:	4f12                lw	t5,4(sp)
    50:	4f82                lw	t6,0(sp)
    52:	6121                addi	sp,sp,64 # 释放栈空间
    54:	30200073          	mret             # 函数返回
}
```



