---
sidebar_position: 5
description: USB物理层电气信号
---

# 05_USB 物理层电气信号

## 1. USB 2.0 连接电路图

USB 主机一般是通过检测 USB 总线上的 D+/D- 电平的变化从而知道设备连接起来，而 D+/D-上电平的变化是通过USB设备端D+/D-上的下拉电阻实现的。

USB 接口一般包含4根线（OTG为5根），分别是：Vcc, D+, D-, GND。

如图所示：

![usb_physics_connect_1](img\usb_physics_connect_1.png)

USB 主机端 D+/D- 下拉 15KΩ 电阻到 GND（0V），从机端 D+/D- 上拉 1.5KΩ 电阻到 3.3V。当从机接入主机时，D+/D-上的电压变为 **3V**，双方通过电平变化就可以发现 USB 的拔插事件。

USB 拔插事件会触发主机的中断（或回调），执行从机的加载、释放过程。

## 2. 示波器抓取 D+/D- 信号

如下图所示，抓取 SOF 包。

![usb_sof_packet_oscilloscope_1](img\usb_sof_packet_oscilloscope_1.png)

## 3. 逻辑分析仪抓取 D+/D- 信号

逻辑分析仪可以直接分析出每个包的含义：

![usb_sof_packete_logic_analyzer](img\usb_sof_packete_logic_analyzer.png)

