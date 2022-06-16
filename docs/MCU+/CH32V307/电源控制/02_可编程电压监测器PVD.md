---
sidebar_position: 2
description: 利用PVD，设定阈值，监测VDD是否低于该值 
---



# 可编程电压监测器(PVD)



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

## 1. PVD简介

可编程电压监测器(PVD), 用于监控系统主电源的变化。

内部滞回比较器监测VDD电压，根据设置的PVD阈值更新PVD标志位，同时可产生中断（EXTI16），工作流程如下：

![pvd_work_flow](img\pvd_work_flow.png)

## 2. 设置监控电压阈值

设置PWR_CTLR寄存器的PLS[2:0]域，具体参数如下：

| PLS[2:0] | 说明                         |
| -------- | ---------------------------- |
| 000      | 上升沿2.37V，    下降沿2.29V |
| 001      | 上升沿2.55V ，   下降沿2.46V |
| 010      | 上升沿2.63V ，   下降沿2.55V |
| 011      | 上升沿2.76V ，   下降沿2.67V |
| 100      | 上升沿2.87V，    下降沿2.78V |
| 101      | 上升沿3.03V，    下降沿2.93V |
| 110      | 上升沿3.18V ，   下降沿3.06V |
| 111      | 上升沿3.29V ，   下降沿3.19V |

详细说明见[数据手册](https://www.wch.cn/downloads/CH32V20x_30xDS0_PDF.html)中电气特性部分。

<details>
  <summary><code>参考代码</code> </summary>

```c
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); /* enable pwr of rcc */

    PWR_PVDCmd(ENABLE); /* enable pvd */
    PWR_PVDLevelConfig(PWR_PVDLevel_2V9); /* set threshold of PVD */ 
```
</details>

## 3. 配置PVD中断

电源状态寄存器`PWR_CSR`中的PVDO标志：

- 当VDD**高于**PVD阈值时，PVDO输出**低**
- 当VDD**低于**PVD阈值时，PVDO输出**高**

该标志连接外部中断的第16线，如需开启PVD电压监测中断，需要使能外部中断的EXTI16线。

- 当VDD**高于**PVD阈值时，会产生 <Highlight color="#25c2a0">下降沿中断 </Highlight>
- 当VDD**低于**PVD阈值时，会产生 <Highlight color="#25c2a0">上升沿中断 </Highlight>

<details>
  <summary><code>参考代码</code> </summary>

```c
#include "debug.h"

void pvd_exti_init(void)
{
    EXTI_InitTypeDef EXTI_InitStructure = {0};

    EXTI_InitStructure.EXTI_Line = EXTI_Line16;
    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;
    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising_Falling; 
    EXTI_InitStructure.EXTI_LineCmd = ENABLE;
    EXTI_Init(&EXTI_InitStructure);

    NVIC_SetPriority(PVD_IRQn,0x00);
    NVIC_EnableIRQ(PVD_IRQn);
}

int main(void)
{
    Delay_Init();
    USART_Printf_Init(256000);

    printf("ch32v307 PVD test\r\n");

    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); /* enable pwr of rcc */

    PWR_PVDCmd(ENABLE); /* enable pvd */
    PWR_PVDLevelConfig(PWR_PVDLevel_2V9); /* set threshold of PVD */ 

    pvd_exti_init();

    while(1)
    {
        // if(PWR->CSR & PWR_CSR_PVDO)
        // {
        //     printf("VDD is below the threshold set by PVD\r\n");
        //     Delay_Ms(200);
        // }
    }
}


__attribute__((interrupt("WCH-Interrupt-fast")))
void PVD_IRQHandler(void)
{
    if(EXTI_GetITStatus(EXTI_Line16)!=RESET)
    {
        if(PWR->CSR & PWR_CSR_PVDO) 
        {
            printf("VDD is below the threshold set by PVD\r\n");
        }
        else
        {
            printf("VDD is above the threshold set by PVD\r\n");
        }
        EXTI_ClearITPendingBit(EXTI_Line16);     /* Clear Flag */
    }
}
```
</details>