---
sidebar_position: 8
description: risc-v 指令寻找模式
---



# risc-v指令寻址模式

所谓寻址模式，指的时指令中定位操作数(operand) 或者地址的方式。



| 寻址模式   | 解释                                                         | 例子            |
| ---------- | ------------------------------------------------------------ | --------------- |
| 立即数寻址 | 操作数是指令本身的一部分                                     | addi x5, x6, 20 |
| 寄存器寻址 | 操作数存放在寄存器中，指令中指定访问的寄存器从而获取该操作数 | add x5, x6, x7  |
| 基址寻址   | 操作数在内存中，指令中通过指定寄存器（基址base）和立即数（偏移量offset），<br/>通过 base+offset 的方式获得操作数在内存中的地址从而获取该操作数 | sw x5, 40(x6)   |
| PC相对寻址 | 在指令中通过 PC 和指令中的立即数相加获得目标地址的值         | beq x5, x6, 100 |
