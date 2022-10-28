---
sidebar_position: 1
description: VS Code 和 EIDE插件搭建RISC-V MCU开发环境，支持编译和openocd+WCHLink下载
---

# VS Code + EIDE环境搭建

## 1. VS Code

[**Visual Studion Code**](https://code.visualstudio.com/) (**VS Code**)，是一款由微软开发且跨平台的免费源代码编辑器。该软件支持语法高亮、代码自动补全（又称 IntelliSense）、代码重构、查看定义功能，并且内置了命令行工具和 Git 版本控制系统。

- [**VS Code 官网**](https://code.visualstudio.com/)
- [**VS Code 官方文档**](https://code.visualstudio.com/docs)



## 2. Embedded IDE 简介

 [**Embedded IDE**](https://marketplace.visualstudio.com/items?itemName=CL.eide) (**EIDE**)是一款适用于 8051/STM8/Cortex-M/RISC-V 的单片机开发环境。

能够在 vscode 上提供 **8051**, **STM8**, **Cortex-M**, **RISC-V** 项目的 开发, 编译, 烧录 功能。

- [**eide 官网**](https://marketplace.visualstudio.com/items?itemName=CL.eide)
- [**eide 使用教程**](https://em-ide.com/zh-cn/docs/intro/)

## 3. 在VS Code中安装EIDE插件

![install_eide](img\install_eide.gif)

## 4. 工具链配置

eide还需要调用相应的工具链才可完成MCU的工程编译，

如**8051 MCU** 的工具链`SDCC`或者`Keil C51`, **RISC-V MCU**的工具链`RISC-V GCC`。

**"设置工具链路径"** 中选项的图标表明了工具链路径设置的总体状态

- **√** ：某一个工具链已设置完毕
- **x** ：还没有为任何工具链设置安装路径

![eide_set_toolchain_1](img\eide_set_toolchain_1.png)

工具链可以通过在线的方式安装，有的工具链上github中下载，需要考虑网络情况，如RISC-V官方工具链下载[网址](https://github.com/riscv-collab/riscv-gnu-toolchain)。

沁恒RISC-V系列MCU支持官方RISC-V GCC工具链，不过其自研的RISC-V架构青稞系列处理器增加了自定义压缩指令、硬件压栈、免表中断等功能，需要使用其自家的工具链。工具链在MounRiver Studio（MRS） 安装目录下：`D:\MounRiver\MounRiver_Studio\toolchain\RISC-V Embedded GCC\bin`。

为EIDE配置本地 RISC-V 编译工具链（由MRS提供）：

![add_riscv_toolchain](img\add_riscv_toolchain.gif)

:::tip

`工具链安装目录` 是指你的编译器的**根目录**
示例：

- 如果你的 GCC 编译器位置是：`D:/MounRiver/MounRiver_Studio/toolchain/RISC-V Embedded GCC/bin/riscv-none-embed-gcc.exe`
- 那么，你需要将 `工具链安装目录` 设置为 `D:/MounRiver/MounRiver_Studio/toolchain/RISC-V Embedded GCC`，因此对于 GCC 来说，这个目录就是 `bin` 文件夹所在的目录

详细过程参考[**eide 使用教程**](https://em-ide.com/zh-cn/docs/intro/)

:::

## 5. openocd下载配置

通过openocd和wchlink可以对沁恒RISC-V MCU进行程序下载。

在EIDE中需要配置openocd的路径，该工具同样也在MRS的安装目录下：`D:\MounRiver\MounRiver_Studio\toolchain\OpenOCD\bin\openocd.exe`

![add_openocd_path](img\add_openocd_path.gif)



## 6. 新建工程

通过github远程仓库模板新建工程，**需要保证能正常访问github**

![new_project_github](img\new_project_github.gif)

:::caution

github中的模板更新并不及时。

模板中的sdk文件夹中的 Core、Debug、Ld、Peripheral、Startup文件夹可能并不是最新的,

建议在[**官网下载**](https://www.wch.cn/)最新的evt，替换对应的文件即可。

:::
