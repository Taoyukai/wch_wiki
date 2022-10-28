---
sidebar_position: 1
description: CH32V307 IO极限翻转测试
---

# CH32V307 IO极限翻转测试

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

记录RISC-V MCU CH32V307 在144MHz主频、-Os优化下，IO极限翻转频率。

## 1. 不同的GPIO翻转代码对速度的影响

GPIO初始化代码如下：

```c
/*********************************************************************
 * @fn      GPIO_Toggle_INIT
 *
 * @brief   Initializes GPIOA.0
 *
 * @return  none
 */
void GPIO_Toggle_INIT(void)
{
    GPIO_InitTypeDef GPIO_InitStructure = {0};
 
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
    GPIO_Init(GPIOA, &GPIO_InitStructure);
}

int main(void)
{
  
    Delay_Init();
    USART_Printf_Init(115200);
    printf("ch32v307 hello world\r\n");

    GPIO_Toggle_INIT();

    while(1)
    {
        GPIOA->OUTDR |= GPIO_Pin_0;
        GPIOA->OUTDR &= ~GPIO_Pin_0;
    }
}
```

使用A0作为测试IO口，初始化为推挽输出模式，翻转速度设置为50MHz。

翻转频率为 **9.6MHz**，测试结果如下：

![gpio_toggle_1](img\gpio_toggle_1.png)

9.6MHz 的速度与预估差距有点大，看下反汇编结果如下：

![gpio_toggle_1_ass](img\gpio_toggle_1_ass.png)

两条C语言代码，需要翻译成7条汇编指令执行，速度当然快不起来。

7条汇编指令，共花费 144MHz / 9.6MHz = **15** 个周期，

换个方式，采用异或的方式翻转IO ` GPIOA->OUTDR ^= GPIO_Pin_0;`反汇编只有4条指令。

![gpio_toggle_2_ass](img\gpio_toggle_2_ass.png)

测试结果如下：

![gpio_toggle_2](img\gpio_toggle_2.png)

只有 **9MHz**，虽然执行指令数量只有 4 条，但是翻转速度竟然变慢了，共花费 144Mhz / 9MHz = **16** 个周期。

我猜测是 `xori` 这条异或指令的执行周期比 `ori` 或 `addi` 指令执行周期长导致的。



为了测试 IO 的极限翻转速度，将执行指令压缩至最短，不用 ori 或 addi 指令，共3条汇编指令，代码如下：


![gpio_toggle_3_ass](img\gpio_toggle_3_ass.png)

测试结果如下：

![gpio_toggle_3](img\gpio_toggle_3.png)

IO翻转速度提高到 24MHz， 3条汇编指令共花费 144Mhz / 24MHz = **6** 个周期。



:::tip

上面测试的是GPIO的极限翻转速率，即通过GPIO引脚模拟通信协议波特率最高不会超过 **24Mbps**。

如需更高频率，可以通过 **SPI** 等外设模拟。

:::
