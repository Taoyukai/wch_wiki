---
sidebar_position: 1
description: 介绍RISC-V指令集架构 
---

# RISC-V 指令集架构

## 1. 指令集架构ISA 

前面我们进行了一场头脑风暴，模拟MCU执行了一段程序，模拟运行的程序是我们自行定义的，那么在实际的MCU芯片中，运行的指令是如何规定的呢？

再思考一个问题，还记得用C语言的编写的hello world程序吗？

``` c
void main()
{
    printf("Hello, World！");
}
```

该程序在PC、8位MCU、32位MCU这些不同的平台上都能正常运行，这是为什么呢？

答案就是有一套标准规范，正因为编译器和芯片设计时都遵循这套规范，使得高级语言编写的程序经指定编译器编译后能直接运行在对应的芯片上。

这套标准规范就是**指令集架构**（Instruction Set Architecture，ISA）。

ISA主要分为复杂指令集（Complex Instruction Set Computer，CISC）和精简指令集（Reduced Instruction Set Computer，RISC），典型代表如下：

<table>
    <tr>
        <td>类型</td>
        <td>名称</td>
        <td>特点</td>
        <td>应用领域</td>
    </tr>
    <tr>
        <td>复杂指令集CISC</td>
        <td>x86</td>
        <td>性能高<br/> 速度快<br/> 兼容性好</td>
        <td>PC<br/>服务器</td>
    </tr>
    <tr>
        <td rowspan="2">精简指令集RISC</td>
        <td>ARM</td>
        <td>生态成熟<br/>非离散<br/>需授权</td>
        <td>移动设备<br/>嵌入式设备</td>
    </tr>
     <tr>
        <td>RISC-V</td>
        <td>开源<br/>模块化<br/>简洁<br/>可拓展</td>
        <td>物联网<br/>人工智能<br/>边缘计算</td>
    </tr>
</table>

ISA是底层硬件电路面向上层软件程序提供的一层**接口规范**，即机器语言程序所运行的计算机硬件和软件之间的“**桥梁**”。ISA主要定义了如下内容：

* 基本数据类型及格式（byte、int、word……）

* 指令格式，寻址方式和可访问地址空间大小

* 程序可访问的通用寄存器的个数、位数和编号

* 控制寄存器的定义

* I/O空间的编址方式

* 异常或中断的处理方式

* 机器工作状态的定义和切换

* ……

ISA规定了机器级程序的格式和行为，即ISA具有软件看得见（能感觉到）的特性，因此用机器指令或汇编指令编写机器级程序时，必须熟悉对应平台的ISA。

不过程序员大多使用高级语言（C/C++、Java）编写程序，由工具链编译转换为对应的机器语言，不需要了解ISA和底层硬件的执行机理。

## 2. 开源指令集RISC-V

![riscv_1](img\riscv_1.png)



**RISC**由美国加州大学伯克利分校教授David Patterson发明。

**RISC-V**（读作”risk-five“），表示第五代精简指令集，起源于2010年伯克利大学并行计算实验室(Par Lab) 的Krste Asanovic教授、Andrew Waterman和Yunsup Lee研究生的一个项目（该项目也由David Patterson指导），希望选择一款指令集用于科研和教学，该项目在x86、ARM等指令集架构中徘徊，最终决定自己设计一个全新的指令集，RISC-V由此诞生。RISC-V的最初目标是实用、开源、可在学术上使用，并且在任何硬件或软件设计中部署时无需版税。

![riscv_2](img\riscv_2.png)

## 3. RISC-V 特点

### 3.1  模块化的指令集

risc-v指令集采用模块化的方式进行组织设计，由基本指令集和扩展指令集组成，每个模块用一个英文字母表示。

其中，整数（Integer）指令集用字母“**I**”表示，这是RISC-V处理器最基本也是唯一强制要求实现的指令集。

其他指令集均为可选模块，可自行选择是否支持。

risc-v指令模块描述如下：

<table>
    <tr>
        <td>类型</td>
        <td>指令集</td>
        <td>指令数</td>
        <td>描述</td>
    </tr>
    <tr>
        <td rowspan="4">基本指令集</td>
        <td>RV32I</td>
        <td>47</td>
        <td>32位地址与整数指令<br/>支持32个通用寄存器</td>
    </tr>
    <tr>
        <td>RV32E</td>
        <td>47</td>
        <td>RV32I的子集<br/>支持16个通用寄存器</td>
    </tr>
    <tr>
        <td>RV64I</td>
        <td>59</td>
        <td>64位地址与整数指令集及<br/>部分32位整数指令<br/>支持32个通用寄存器</td>
    </tr>
    <tr>
        <td>RV128I</td>
        <td>71</td>
        <td>128位地址与整数指令集及<br/>部分64位和32位整数指令<br/>支持32个通用寄存器</td>
    </tr>
    <tr>
        <td rowspan="6">扩展指令集</td>
        <td>M</td>
        <td>8</td>
        <td>乘法（Multiplication）与除法指令</td>
    </tr>
    <tr>
        <td>A</td>
        <td>11</td>
        <td>存储器原子（Automic）操作指令</td>
    </tr>
    <tr>
        <td>F</td>
        <td>26</td>
        <td>单精度（32bit）浮点（Float）运算指令</td>
    </tr>
    <tr>
        <td>D</td>
        <td>26</td>
        <td>双精度（64bit）浮点（Double）运算指令</td>
    </tr>
    <tr>
        <td>C</td>
        <td>46</td>
        <td>压缩（Compressed）指令，指令长度位16bit</td>
    </tr>
    <tr>
        <td>Zicsr</td>
        <td>6</td>
        <td>控制和状态寄存器访问指令</td>
    </tr>
 </table>


:::tip

以上指令集描述基于20191213版非特权指令集规范手册，最新指令模块说明参考[官网指令集规范手册](https://riscv.org/technical/specifications/)  

:::

:::info

通常把模块“**I**”、“**M**”、“**A**”、**“F**”和“**D**”的特定组合“**IMAFD**”称为通用组合（General），用字母“**G**”表示。如用RV32G表示RV32IMAFD。

:::

### 3.2 可配置的寄存器

RV32I支持**32个通用寄存器**x0~x31，每个寄存器长度均为32位，其中寄存器x0恒为0，剩余31个为任意读/写的通用寄存器。

为了增加汇编程序的阅读性，汇编编程时通常采用应用程序二进制接口协议（Application Binary Interface，ABI）定义的寄存器名称。

RV32I通用寄存器如下：

| 寄存器名称 | ABI名称  | 说明                                               | 存储者 |
| ---------- | -------- | -------------------------------------------------- | ------ |
| x0         | zero     | 读取时总为0，写入时不起任何效果                    | N/A    |
| x1         | ra       | 程序返回地址                                       | Caller |
| x2         | sp       | 栈空间指针                                         | callee |
| x3         | gp       | 全局变量指针（基地址）                             | /      |
| x4         | tp       | 线程变量指针（基地址）                             | /      |
| x5 ~ x7    | t0 ~ t2  | 临时寄存器                                         | Caller |
| x8         | s0/fp    | 保存寄存器/帧指针（配合栈指针界定函数栈）          | Callee |
| x9         | s1       | 保存寄存器（被调用函数使用时需备份并在退出时恢复） | Callee |
| x10, x11   | a0, a1   | 函数参数寄存器（用于函数参数/返回值）              | Caller |
| x12 ~ x17  | a2 ~ a7  | 函数参数寄存器（用于函数参数）                     | Caller |
| x18 ~ x27  | s2 ~ s11 | 保存寄存器（被调用函数使用时需备份并在退出时恢复） | Callee |
| x28 ~ x31  | t3 ~ t6  | 临时寄存器                                         | Caller |

* Caller：来访者，简单来说就是打电话的，即调用函数的函数，

* Callee：被访者，简单来说就是接电话的，即被调用函数

![caller_callee](img\caller_callee.png)

* 寄存器的宽度由ISA指定，如RV32的通用寄存器宽度为32位，RV64的通用寄存器宽度为64位。

* 如果支持浮点指令，则需额外支持32个浮点（Float Point）寄存器

* 不同于arm，risc-v中PC指针不占用通过寄存器，而是独立的，程序执行中自动变化，无法通过通用寄存器访问和修改PC值。

:::note

此外，risc-v还定义了一组控制和状态寄存器（Control and Status Registers，**CSR**），用于记录内核运行状态。

详情参考[特权指令集规范](https://riscv.org/technical/specifications/  )

:::  



### 3.3  特权级别 

risc-v规定如下四个特权级别（privilege level）：

| 等级（Level） | 编码（Encoding） | 名称（Name）                      | 缩写（Abbreviation） |
| ------------- | ---------------- | --------------------------------- | -------------------- |
| 0             | 00               | 用户/应用模式（User/Application） | U                    |
| 1             | 01               | 管理员模式（Supervisor ）         | S                    |
| 2             | 10               | Reserved                          | -                    |
| 3             | 11               | 机器模式（Machine）               | M                    |

* **机器模式（M）**，risc-v处理器在复位后自动进入机器模式（M），因此，机器模式是所有RISC-V处理器唯一必须要实现的特权模式。此模式下运行的程序权限最高，支持处理器的所有指令，可以访问处理器的全部资源。
* **用户模式（U）**，该模式是可选的，权限最低。此模型下仅可访问限定的资源。
* **管理员模式（S）**，该模式也是可选的，旨在支持Linux、Windows等操作系统。管理员模式可访问的资源比用户模式多，但比机器模式少。

通过不同特权模式的组合，可设计面向不同应用场景的处理器，如：

| 模式数量 | 支持模式 | 目标应用                           |
| -------- | -------- | ---------------------------------- |
| 1        | M        | 简单嵌入式系统                     |
| 2        | M，U     | 安全嵌入式系统                     |
| 3        | M，S，U  | 支持Unix、Linux、Windows等操作系统 |

## 4. RISC-V 汇编指令

### 4.1 编码格式



![risc-v_ISA_format_1_](img\risc-v_ISA_format_1.png)

- 指令长度：**ILEN1** = 32 bits(RV32I)

- 指令对齐：IALIGN = 32 bits(RV32I)

- 32个 bit 被划分成不同的**域（field）**

- funct3/funct7和opcode一起决定最终的指令类型

- 指令在内存中按照**小端序**排列

    

:::tip 主机字节序（HBO - Host Byte Order） 

- 一个**多字节整数**在计算机内存中存储的字节顺序称为主机字节序（HBO - Host Byte Order），或称为本地字节序

- 不同类型CPU的设计不同，HBO也不同，分为**大端序（Big-Endian）**和**小端序（Little-Endian）**
    - 大端序（Big-Endian）- 从**高位**开始按照从低地址到高地址的顺序存放数据
    - 小端序（Little-Endian）- 从**低位**开始按照从低地址到高地址的顺序存放数
    
    

:::

- 6种指令格式

    - **R-type**：Register，每条指令中有用于指定3个寄存器参数的3个fields（rd，rs1，rs2）
    
    - **I-type**：Immediate，每条指令除了带有两个寄存器参数外，还带有一个立即数参数（宽度为12 bits）
    
    - **S-type**：Store，每条指令除了带有两个寄存器参数外，还带有一个立即数参数（宽度为12 bits，但fields的组织方式不同于 I-type）
    
    - **B-type**：Branch，每条指令除了带有两个寄存器参数外，还带有一个立即数参数（宽度为12 bits，但取值为2的倍数）
    
    - **U-type**：Upper，每条指令含有一个寄存器参数，再加上一个立即数参数（宽度为20 bits，用于表示一个立即数的高20位），因为一条32位指令中无法表示高达32位的数据
    
    - **J-type**：Jump，每条指令含有一个寄存器参数再加上一个立即数参数（宽度为20 bits）
    

:::info risc-v支持用户自定义指令扩展
    

opcode位的取值含义参考[RISC-V非特权规范](https://riscv.org/technical/specifications/)

![risc-v_ISA_format_2](img\risc-v_ISA_format_2.png)

**opcode**域的最低两位固定为11，其他位代表的类型详见上表，其中**custom**代表用户自定义指令扩展

:::



### 4.2 常见汇编指令

![risc-v_assembly_overview](img\risc-v_assembly_overview.png)

### 4.3 伪指令

详细伪指令见规范手册第25章- risc-v assembly programmer‘s handbook

![risc-v_pseudoinstructions_overview](img\risc-v_pseudoinstructions_overview.png)
