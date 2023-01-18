---
sidebar_position: 1
description: USB 简介
---



# 01_USB 简介

## 1. USB 概述

**USB**：Universal Serial Bus，通用串行总线。是一种快速、灵活的总线接口。

最初是由**英特尔**与**微软**倡导发起，最大的特点是尽可能地实现**热插拔**和**即插即用**。



## 2. USB 标准

USB 的标准由 USB开发者论坛 （**USB** **I**mplementers **F**orum，缩写：USB-IF）负责制定。

USB-IF 官网：https://www.usb.org/ 

### 2.1 USB 版本

![usb_version](img\usb_version.png)



:::tip

注意USB-IF目前正式的主版本号只有USB 2.0和USB 3.2两个。

:::

### 2.2 物理接头

![usb_physics_plug](img\usb_physics_plug.png)



USB插头对各USB协议规范的支持情况：

![usb_plug_speed](img\usb_plug_speed.png)

### 2.3 连接模型

USB是一种主从结构。主机叫做 **Host**，从机叫做 **Device**（也叫做设备）。

**集线器（HUB）**也被当作一种特殊的设备处理，用于扩展USB端口（扩展的USB端口可以增加USB总线上物理设备的连接）。

USB的拓扑结构为金字塔型。由一个USB主控制器出发，下面接USB HUB，将一个USB口扩展为多个USB口，多个USB口又可以通过HUB 扩展更多个接口。

但USB协议中对 HUB 的层数是有限制的，USB1.1 规定最多为 5 层，USB2.0 规定最多为 7 层。

![usb_bus_topology](img\usb_bus_topology.png)

理论上，一个USB主控制器最多可接 **127** 个设备，这是由数据包中的 **7** 位地址位决定的。





## 参考

- [USB 维基百科](https://zh.wikipedia.org/zh-my/USB)
- [USB 2.0 Specification](https://www.usb.org/sites/default/files/usb_20_20211008.zip)
- [USB中文网](https://www.usbzh.com/article/detail-144.html)

