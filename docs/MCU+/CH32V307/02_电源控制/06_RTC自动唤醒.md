---
sidebar_position: 6
description: 设置RTC自动唤醒MCU
---


# RTC自动唤醒

RTC，Real Time Clock，实时时钟，可以在不需要外部中断的情况下唤醒低功耗模式下的MCU。

RTC提供的定时闹钟事件，可以周期性的唤醒MCU。

## 1. RTC唤醒配置

RTC唤醒配置步骤如下：

- 配置RTC时钟
- 配置外部中断线17为上升沿触发
- 开启RTC闹钟事件中断

:::tip

详细的 RTC 配置可参考 [RTC章节](/docs/category/06_实时时钟rtc)

:::

## 2. 参考代码

 <details>
  <summary><code>参考代码 - RTC唤醒停止模式</code> </summary>

```c
#include "debug.h"

void rtc_exit17_init(void)
{
    EXTI_InitTypeDef EXTI_InitStructure = {0};
    EXTI_ClearITPendingBit(EXTI_Line17);
    EXTI_InitStructure.EXTI_Line = EXTI_Line17;
    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;
    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising;
    EXTI_InitStructure.EXTI_LineCmd = ENABLE;
    EXTI_Init(&EXTI_InitStructure);

    NVIC_SetPriority(RTCAlarm_IRQn,0x00);
    NVIC_EnableIRQ(RTCAlarm_IRQn);
}

void rtc_init(void)
{
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);

    PWR_BackupAccessCmd(ENABLE);
    /* enable LSI */
    RCC_LSICmd(ENABLE);  

    /* wait for LSI to stabilize */
    while (RCC_GetFlagStatus(RCC_FLAG_LSIRDY) == RESET);  

    /* select LSI as rtc clock */
    RCC_RTCCLKConfig(RCC_RTCCLKSource_LSI); 
    RCC_RTCCLKCmd(ENABLE);
    RTC_WaitForLastTask();
    RTC_WaitForSynchro();

    /* enable Alarm interrupt */
    RTC_ITConfig(RTC_IT_ALR, ENABLE);

    RTC_WaitForLastTask();

    /* set rtc prescaler value */
    RTC_SetPrescaler(32767);  

    RTC_WaitForLastTask();
}

int main(void)
{

   /* Configure unused GPIO as IPD to reduce power consumption */
    GPIO_InitTypeDef GPIO_InitStructure = {0};   
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA|RCC_APB2Periph_GPIOB|
             RCC_APB2Periph_GPIOC|RCC_APB2Periph_GPIOD|RCC_APB2Periph_GPIOE, ENABLE);
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_All;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPD;

    GPIO_Init(GPIOA, &GPIO_InitStructure);
    GPIO_Init(GPIOB, &GPIO_InitStructure);
    GPIO_Init(GPIOC, &GPIO_InitStructure);
    GPIO_Init(GPIOD, &GPIO_InitStructure);
    GPIO_Init(GPIOE, &GPIO_InitStructure);
    /***************************************/


    Delay_Init();
    USART_Printf_Init(256000);

    rtc_init();
    rtc_exit17_init();

    printf("ch32v307 stop mode wakeup by rtc test\r\n");
    Delay_Ms(2000);
    
    /* set alarm event after 5s */
    RTC_SetAlarm(RTC_GetCounter()+5);
    RTC_WaitForLastTask();

    /* set SLEEPONEXIT */
    NVIC->SCTLR |= (1<<1);   

    /* set regulator in low power mode，need enable rcc of pwr */
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); 
    PWR_EnterSTOPMode(PWR_Regulator_LowPower, PWR_STOPEntry_WFI);

    SystemInit();
    printf("wakeup\r\n");

    while(1)
    {
        printf("run in main loop\r\n");
        Delay_Ms(1000);
    }
}

__attribute__((interrupt("WCH-Interrupt-fast")))
void RTCAlarm_IRQHandler(void)
{
    EXTI_ClearITPendingBit(EXTI_Line17);
    RTC_ClearITPendingBit(RTC_IT_ALR);     

    if(PWR_GetFlagStatus(PWR_FLAG_WU) != RESET)
    {
        /* clear wakeup flag */
        PWR_ClearFlag(PWR_FLAG_WU);
    }

    SystemInit();

    printf("RTCAlarm_IRQHandler\r\n");

    /* set alarm event after 5s */
    RTC_SetAlarm(RTC_GetCounter()+5);
    RTC_WaitForLastTask();
}
```
</details>


 <details>
  <summary><code>参考代码 - RTC唤醒待机模式</code> </summary>

```c
#include "debug.h"

void rtc_exit17_init(void)
{
    EXTI_InitTypeDef EXTI_InitStructure = {0};
    EXTI_ClearITPendingBit(EXTI_Line17);
    EXTI_InitStructure.EXTI_Line = EXTI_Line17;
    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Event;
    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising;
    EXTI_InitStructure.EXTI_LineCmd = ENABLE;
    EXTI_Init(&EXTI_InitStructure);

}

void rtc_init(void)
{
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);

    PWR_BackupAccessCmd(ENABLE);
    /* enable LSI */
    RCC_LSICmd(ENABLE);  

    /* wait for LSI to stabilize */
    while (RCC_GetFlagStatus(RCC_FLAG_LSIRDY) == RESET);  

    /* select LSI as rtc clock */
    RCC_RTCCLKConfig(RCC_RTCCLKSource_LSI); 
    RCC_RTCCLKCmd(ENABLE);
    RTC_WaitForLastTask();
    RTC_WaitForSynchro();

    /* enable Alarm interrupt */
    RTC_ITConfig(RTC_IT_ALR, ENABLE);

    RTC_WaitForLastTask();

    /* set rtc prescaler value */
    RTC_SetPrescaler(32767);  

    RTC_WaitForLastTask();
}

int main(void)
{

   /* Configure unused GPIO as IPD to reduce power consumption */
    GPIO_InitTypeDef GPIO_InitStructure = {0};   
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA|RCC_APB2Periph_GPIOB|
             RCC_APB2Periph_GPIOC|RCC_APB2Periph_GPIOD|RCC_APB2Periph_GPIOE, ENABLE);
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_All;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPD;

    GPIO_Init(GPIOA, &GPIO_InitStructure);
    GPIO_Init(GPIOB, &GPIO_InitStructure);
    GPIO_Init(GPIOC, &GPIO_InitStructure);
    GPIO_Init(GPIOD, &GPIO_InitStructure);
    GPIO_Init(GPIOE, &GPIO_InitStructure);
    /***************************************/


    Delay_Init();
    USART_Printf_Init(256000);

    rtc_init();
    rtc_exit17_init();

    printf("ch32v307 standby mode wakeup by rtc test\r\n");
    Delay_Ms(2000);
    
    /* set alarm event after 5s */
    RTC_SetAlarm(RTC_GetCounter()+5);
    RTC_WaitForLastTask();

    /* set PWR register, need enable rcc of pwr */
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); 

    /* standby mode, mcu will reset after wakeup event */
    PWR_EnterSTANDBYMode();

    printf("wakeup\r\n");

    while(1)
    {
        printf("run in main loop\r\n");
        Delay_Ms(1000);
    }
}
```
</details>