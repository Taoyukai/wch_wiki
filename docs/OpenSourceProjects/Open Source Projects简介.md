---
sidebar_position: 1
description:  RISC-V MCU 开源项目
---

# RISC-V MCU 开源项目

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

##  <Highlight color="#25c2a0"> 一、教程类 </Highlight>


### [1. RISC-V MCU原理与应用](/docs/category/risc-v-mcu原理与应用)

基于沁恒无线型 RISC-V MCU [**CH32V208**](https://www.wch.cn/products/CH32V208.html)，从内核到外设学习 RISC-V MCU 的原理，并提供大量Demo进行相关应用开发。

### [2. 手写一个RISC-V MCU RTOS](/docs/category/手写一个risc-v-mcu-rtos)

基于沁恒增强型 RISC-V MCU [**CH32V203**](https://www.wch.cn/products/CH32V203.html?)，从零开始写一个实时操作系统（RTOS），深入了解任务的内存管理以及上下文切换。

##  <Highlight color="#25c2a0">  二、Demo 应用 </Highlight>

### [1. CH32V003制作音乐频谱显示](/docs/OpenSourceProjects/demo_app/CH32V003制作音乐频谱显示)
采用CH32V003做主控，麦克风+CH32V003内置运放+ADC采集音乐，做128点fft，驱动64颗ws2812组成的8*8阵列，完成低成本音乐频谱显示。

