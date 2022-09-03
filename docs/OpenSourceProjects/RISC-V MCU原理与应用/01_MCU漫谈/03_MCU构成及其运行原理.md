---
sidebar_position: 3
description: 介绍MCU的内部组成并阐述MCU运行原理
---

# MCU构成及其运行原理

## 1. MCU概念

MCU，微控制单元(Microcontroller Unit) ，又称单片微型计算机(Single Chip Microcomputer )或者单片机，是把中央处理器CPU(Central Processing Unit)的频率与规格做适当缩减，并将内存(memory)、计数器(Timer)、USB、A/D转换、UART、PLC、DMA等周边接口，甚至LCD驱动电路都整合在单一芯片上，形成芯片级的计算机，为不同的应用场合做不同组合控制。

## 2. MCU构成

![mcu_architecture](img\mcu_architecture.png)

MCU一般有以下几个部分组成：

- CPU
- Memory（Flash/RAM）
- Bus
- Peripheral

## 3. 头脑风暴 - 模拟MCU运行

### 3.1 准备工作

和图灵机类似，我们在模拟MCU运行时，需要做一些前期准备工作。

（1）准备一段程序，程序存储在memory中

（2）准备一组数据，数据同样存储在memory中

（3）设置PC指针，指向Address 0处



MCU中CPU的Control Unit控制单元，负责取指（Fetch）、译码（Decode）、执行（Excute）这样的循环运行。

CPU从memory取得指令，进行译码识别指令的需要，并执行对应的操作，为了CPU能够识别我们写的操作，进行如下规定：

| 指令 Instruction | 指令描述 Description                                         | 操作码 Opcode | 操作数 Operand                    |
| ---------------- | ------------------------------------------------------------ | ------------- | --------------------------------- |
| xxxx-00-01       | 从Address中加上数据到寄存器0中                               | LOAD: 01      | Register_0: 00<br/>Address: xxxx  |
| xxxx-01-01       | 从Address中加上数据到寄存器1中                               | LOAD: 01      | Register_1: 01<br/>Address: xxxx  |
| NN-01-00-11      | 将Register_0和Register_1中的数据相加，<br/>得到的结果保存在Register_0中 | ADD: 11       | Register_0: 00<br/>Register_1: 01 |
| xxxx-00-10       | 将Register_0中的值存储到Address中                            | STORE: 10     | Register_0: 00<br/>Address: xxxx  |



### 3.2 MCU模拟运行

根据上一节的准备工作，MCU当前状况如下图所示：

![mcu_run_0](img\mcu_run_0.png)

**（1）取指**

此时，PC指针指向Address 0处，取得指令01000001

![mcu_run_0](img\mcu_run_1.png)

**（2）译码**

根据上一节的规定，01000001指令代表的含义为：从将Address 4中的数据取出存放到Register 0中

![mcu_run_0](img\mcu_run_2.png)

**（3）执行**

根据指令译码的结果，将Address 4中的数据00000010存放到Register 0 中

![mcu_run_0](img\mcu_run_3.png)

接着执行下一条指令，重复上面的操作，每步执行如下：

PC 指向Address 1，取得指令01010101，译码执行，将address 5中的数据存放到Register 1中。

![mcu_run_0](img\mcu_run_4.png)

PC 指向Address 2，取得指令00010011，译码执行，将Register 0 和 Register 1 中的数据相加，结果存放到Register 0中。

![mcu_run_0](img\mcu_run_5.png)

PC 指向Address 3，取得指令01100010，译码执行，将Register 0中的数据存放到Address 6中。

![mcu_run_0](img\mcu_run_6.png)

至此，MCU完成了一段程序的执行，计算了3+2，得到的结果5保存在Memory中。

:::tip 

顺利完成了MCU的模拟运行，其中的一些问题还需要思考：

- 程序中的指令是我们自己定义的，而目前实际MCU产品中运行的都是什么样的指令？
- 程序中都是0和1这样的数据，实际编程开发中，是写0、1这样的数据吗？

:::
