---
sidebar_position: 1
description: CH32V307的Flash和SRAM大小设置方法
---

# 可配置的Flash和SRAM

赤菟V307（CH32V307）是一款RISC-V内核的MCU，搭载的是沁恒自研RISC-V内核青稞V4F，最高主频144MHz，支持单精度浮点运算（FPU）。通常官网介绍Flash大小为256 KB，SRAM大小为64 KB。

![CH32V307_flash_ram](img\CH32V307_flash_ram.png)

仔细阅读应用手册发现，其Flash和SRAM的大小支持配置，具体配置项如下：

:::info Flash和SRAM配置组合

* 192 KB Flash + 128 KB SRAM
* 224 KB Flash + 96 KB SRAM
* 256 KB Flash + 54 KB SRAM
* 288 KB Flash + 32 KB SRAM

:::

下面一起了解下CH32V307隐藏着的彩蛋吧！

## 彩蛋1

RAM最高可配置到128 KB，直接翻倍，可以撸起袖子敲代码啦，再也不用担心RAM不够啦~

其实赤菟V307内部有一块**320 KB SRAM**，分为A、B两块，A、B块的大小由用户选择字的user的**SRAM_CODE_MODE** 位决定，A块负责存放用户代码，B块留作单片机真正的SRAM，每次上电运行时，内部自动从Code Flash中加载A块大小的用户代码运行。

**当然用户代码的实际Flash和SRAM大小不要超出配置的范围，否则会导致程序无法运行等问题。**

![v307_userByte](img\v307_userByte.png)

实际在操作Flash时，也不会有Flash等待的问题。

## 彩蛋2

细心的小伙伴或许会发现，V307 Flash最大配置为288 KB，而Code Flash的大小为488 KB，这也是隐藏的彩蛋哦，剩下的**200 KB** Flash可以当作存储用，**不过需要注意该处Flash等待的问题**。



## 配置方法

既然赤菟V307的Flash和SRAM是可配置的，那么聊聊配置的方法吧！

### （1）WCHISBTool配置

* step 1：切换启动模式，BOOT0 = 1，BOOT1 = 0
* step 2：通过WCHISPTool工具配置用户选择字，具体步骤见下图

![steps](img\steps.png)

* step 3：切换启动模式，BOOT0 = 0，BOOT1 = 0

    

### （2）用户代码配置

```c
typedef enum
{
	FlASH_192_SRAM_128 = 0,
	FLASH_224_SRAM_96,
	FLASH_256_SRAM_64,
	FLASH_288_RAM_32
} FLASH_SRAM_DEFIN;

//note: this operation will take effect after reset
void Config_Flash_SRAM(FLASH_SRAM_DEFIN SetFlashSRAM)
{
	uint8_t UserByte = FLASH_GetUserOptionByte() & 0xff; //get user option byte

	switch(SetFlashSRAM)
	{
	case 0:
		UserByte &= ~(0xc0); // SRAM_CODE_MODE = 00
		break;
	case 1:
		UserByte &= ~(0xc0); // SRAM_CODE_MODE = 00
		UserByte |= 0x7f;    // SRAM_CODE_MODE = 01
		break;
	case 2:
		UserByte &= ~(0xc0); // SRAM_CODE_MODE = 00
		UserByte |= 0xbf;    // SRAM_CODE_MODE = 10
		break;
	case 3:
		UserByte |= 0xff;    // SRAM_CODE_MODE = 11
		break;
	default:
		break;
	}

	FLASH_Unlock();
	FLASH_ProgramOptionByteData(0x1ffff802, UserByte);
	FLASH_Lock();
}

/*********************************************************************
 * @fn      main
 *
 * @brief   Main program.
 *
 * @return  none
 */
int main(void)
{
    NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);
    Delay_Init();
    USART_Printf_Init(115200);
    printf("SystemClk:%d\r\n", SystemCoreClock);


    Config_Flash_SRAM(FLASH_288_RAM_32); //配置Flash为244 KB，SRAM为96KB ，复位后生效
    
    printf("userByte = %02x \r\n",FLASH_GetUserOptionByte() & 0xff);  

    while(1)
    {
    	;
    }
}
```



注意以上两种配置方式完成后，还需要同步用户工程代码的ld链接文件中Flash 和 SRAM的大小，与用户选择字配置的大小保持一致。需要了解RISC-V MCU ld链接文件的可以查看该贴：[RISC-V MCU ld链接脚本说明](/docs/category/ld链接文件) 

![v307_project_ld](img\v307_project_ld.png)

