"use strict";(self.webpackChunkwch_wiki=self.webpackChunkwch_wiki||[]).push([[8041],{3905:(n,e,t)=>{t.d(e,{Zo:()=>l,kt:()=>P});var r=t(7294);function i(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function _(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){i(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function C(n,e){if(null==n)return{};var t,r,i=function(n,e){if(null==n)return{};var t,r,i={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var o=r.createContext({}),c=function(n){var e=r.useContext(o),t=e;return n&&(t="function"==typeof n?n(e):_(_({},e),n)),t},l=function(n){var e=c(n.components);return r.createElement(o.Provider,{value:e},n.children)},u={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},I=r.forwardRef((function(n,e){var t=n.components,i=n.mdxType,a=n.originalType,o=n.parentName,l=C(n,["components","mdxType","originalType","parentName"]),I=c(t),P=i,p=I["".concat(o,".").concat(P)]||I[P]||u[P]||a;return t?r.createElement(p,_(_({ref:e},l),{},{components:t})):r.createElement(p,_({ref:e},l))}));function P(n,e){var t=arguments,i=e&&e.mdxType;if("string"==typeof n||i){var a=t.length,_=new Array(a);_[0]=I;var C={};for(var o in e)hasOwnProperty.call(e,o)&&(C[o]=e[o]);C.originalType=n,C.mdxType="string"==typeof n?n:i,_[1]=C;for(var c=2;c<a;c++)_[c]=t[c];return r.createElement.apply(null,_)}return r.createElement.apply(null,t)}I.displayName="MDXCreateElement"},6707:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>o,contentTitle:()=>_,default:()=>u,frontMatter:()=>a,metadata:()=>C,toc:()=>c});var r=t(7462),i=(t(7294),t(3905));const a={sidebar_position:6,description:"\u8bbe\u7f6eRTC\u81ea\u52a8\u5524\u9192MCU"},_="RTC\u81ea\u52a8\u5524\u9192",C={unversionedId:"MCU+/CH32V307/Reference Manual/\u7535\u6e90\u63a7\u5236/RTC\u81ea\u52a8\u5524\u9192",id:"MCU+/CH32V307/Reference Manual/\u7535\u6e90\u63a7\u5236/RTC\u81ea\u52a8\u5524\u9192",title:"RTC\u81ea\u52a8\u5524\u9192",description:"\u8bbe\u7f6eRTC\u81ea\u52a8\u5524\u9192MCU",source:"@site/docs/MCU+/CH32V307/Reference Manual/02_\u7535\u6e90\u63a7\u5236/06_RTC\u81ea\u52a8\u5524\u9192.md",sourceDirName:"MCU+/CH32V307/Reference Manual/02_\u7535\u6e90\u63a7\u5236",slug:"/MCU+/CH32V307/Reference Manual/\u7535\u6e90\u63a7\u5236/RTC\u81ea\u52a8\u5524\u9192",permalink:"/docs/MCU+/CH32V307/Reference Manual/\u7535\u6e90\u63a7\u5236/RTC\u81ea\u52a8\u5524\u9192",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,description:"\u8bbe\u7f6eRTC\u81ea\u52a8\u5524\u9192MCU"},sidebar:"MCU",previous:{title:"\u4f4e\u529f\u8017\u4e4b\u5f85\u673a\u6a21\u5f0f",permalink:"/docs/MCU+/CH32V307/Reference Manual/\u7535\u6e90\u63a7\u5236/\u4f4e\u529f\u8017\u4e4b\u5f85\u673a\u6a21\u5f0f"},next:{title:"03_\u590d\u4f4d\u3001\u6269\u5c55\u548c\u65f6\u949f\u63a7\u5236(RCC)",permalink:"/docs/category/03_\u590d\u4f4d\u6269\u5c55\u548c\u65f6\u949f\u63a7\u5236rcc"}},o={},c=[{value:"1. RTC\u5524\u9192\u914d\u7f6e",id:"1-rtc\u5524\u9192\u914d\u7f6e",level:2},{value:"2. \u53c2\u8003\u4ee3\u7801",id:"2-\u53c2\u8003\u4ee3\u7801",level:2}],l={toc:c};function u(n){let{components:e,...t}=n;return(0,i.kt)("wrapper",(0,r.Z)({},l,t,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"rtc\u81ea\u52a8\u5524\u9192"},"RTC\u81ea\u52a8\u5524\u9192"),(0,i.kt)("p",null,"RTC\uff0cReal Time Clock\uff0c\u5b9e\u65f6\u65f6\u949f\uff0c\u53ef\u4ee5\u5728\u4e0d\u9700\u8981\u5916\u90e8\u4e2d\u65ad\u7684\u60c5\u51b5\u4e0b\u5524\u9192\u4f4e\u529f\u8017\u6a21\u5f0f\u4e0b\u7684MCU\u3002"),(0,i.kt)("p",null,"RTC\u63d0\u4f9b\u7684\u5b9a\u65f6\u95f9\u949f\u4e8b\u4ef6\uff0c\u53ef\u4ee5\u5468\u671f\u6027\u7684\u5524\u9192MCU\u3002"),(0,i.kt)("h2",{id:"1-rtc\u5524\u9192\u914d\u7f6e"},"1. RTC\u5524\u9192\u914d\u7f6e"),(0,i.kt)("p",null,"RTC\u5524\u9192\u914d\u7f6e\u6b65\u9aa4\u5982\u4e0b\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u914d\u7f6eRTC\u65f6\u949f"),(0,i.kt)("li",{parentName:"ul"},"\u914d\u7f6e\u5916\u90e8\u4e2d\u65ad\u7ebf17\u4e3a\u4e0a\u5347\u6cbf\u89e6\u53d1"),(0,i.kt)("li",{parentName:"ul"},"\u5f00\u542fRTC\u95f9\u949f\u4e8b\u4ef6\u4e2d\u65ad")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"\u8be6\u7ec6\u7684 RTC \u914d\u7f6e\u53ef\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/docs/category/06_%E5%AE%9E%E6%97%B6%E6%97%B6%E9%92%9Frtc"},"RTC\u7ae0\u8282"))),(0,i.kt)("h2",{id:"2-\u53c2\u8003\u4ee3\u7801"},"2. \u53c2\u8003\u4ee3\u7801"),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("code",null,"\u53c2\u8003\u4ee3\u7801 - RTC\u5524\u9192\u505c\u6b62\u6a21\u5f0f")," "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'#include "debug.h"\n\nvoid rtc_exit17_init(void)\n{\n    EXTI_InitTypeDef EXTI_InitStructure = {0};\n    EXTI_ClearITPendingBit(EXTI_Line17);\n    EXTI_InitStructure.EXTI_Line = EXTI_Line17;\n    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;\n    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising;\n    EXTI_InitStructure.EXTI_LineCmd = ENABLE;\n    EXTI_Init(&EXTI_InitStructure);\n\n    NVIC_SetPriority(RTCAlarm_IRQn,0x00);\n    NVIC_EnableIRQ(RTCAlarm_IRQn);\n}\n\nvoid rtc_init(void)\n{\n    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);\n\n    PWR_BackupAccessCmd(ENABLE);\n    /* enable LSI */\n    RCC_LSICmd(ENABLE);  \n\n    /* wait for LSI to stabilize */\n    while (RCC_GetFlagStatus(RCC_FLAG_LSIRDY) == RESET);  \n\n    /* select LSI as rtc clock */\n    RCC_RTCCLKConfig(RCC_RTCCLKSource_LSI); \n    RCC_RTCCLKCmd(ENABLE);\n    RTC_WaitForLastTask();\n    RTC_WaitForSynchro();\n\n    /* enable Alarm interrupt */\n    RTC_ITConfig(RTC_IT_ALR, ENABLE);\n\n    RTC_WaitForLastTask();\n\n    /* set rtc prescaler value */\n    RTC_SetPrescaler(32767);  \n\n    RTC_WaitForLastTask();\n}\n\nint main(void)\n{\n\n   /* Configure unused GPIO as IPD to reduce power consumption */\n    GPIO_InitTypeDef GPIO_InitStructure = {0};   \n    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA|RCC_APB2Periph_GPIOB|\n             RCC_APB2Periph_GPIOC|RCC_APB2Periph_GPIOD|RCC_APB2Periph_GPIOE, ENABLE);\n    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_All;\n    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPD;\n\n    GPIO_Init(GPIOA, &GPIO_InitStructure);\n    GPIO_Init(GPIOB, &GPIO_InitStructure);\n    GPIO_Init(GPIOC, &GPIO_InitStructure);\n    GPIO_Init(GPIOD, &GPIO_InitStructure);\n    GPIO_Init(GPIOE, &GPIO_InitStructure);\n    /***************************************/\n\n\n    Delay_Init();\n    USART_Printf_Init(256000);\n\n    rtc_init();\n    rtc_exit17_init();\n\n    printf("ch32v307 stop mode wakeup by rtc test\\r\\n");\n    Delay_Ms(2000);\n    \n    /* set alarm event after 5s */\n    RTC_SetAlarm(RTC_GetCounter()+5);\n    RTC_WaitForLastTask();\n\n    /* set SLEEPONEXIT */\n    NVIC->SCTLR |= (1<<1);   \n\n    /* set regulator in low power mode\uff0cneed enable rcc of pwr */\n    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); \n    PWR_EnterSTOPMode(PWR_Regulator_LowPower, PWR_STOPEntry_WFI);\n\n    SystemInit();\n    printf("wakeup\\r\\n");\n\n    while(1)\n    {\n        printf("run in main loop\\r\\n");\n        Delay_Ms(1000);\n    }\n}\n\n__attribute__((interrupt("WCH-Interrupt-fast")))\nvoid RTCAlarm_IRQHandler(void)\n{\n    EXTI_ClearITPendingBit(EXTI_Line17);\n    RTC_ClearITPendingBit(RTC_IT_ALR);     \n\n    if(PWR_GetFlagStatus(PWR_FLAG_WU) != RESET)\n    {\n        /* clear wakeup flag */\n        PWR_ClearFlag(PWR_FLAG_WU);\n    }\n\n    SystemInit();\n\n    printf("RTCAlarm_IRQHandler\\r\\n");\n\n    /* set alarm event after 5s */\n    RTC_SetAlarm(RTC_GetCounter()+5);\n    RTC_WaitForLastTask();\n}\n'))),(0,i.kt)("details",null,(0,i.kt)("summary",null,(0,i.kt)("code",null,"\u53c2\u8003\u4ee3\u7801 - RTC\u5524\u9192\u5f85\u673a\u6a21\u5f0f")," "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-c"},'#include "debug.h"\n\nvoid rtc_exit17_init(void)\n{\n    EXTI_InitTypeDef EXTI_InitStructure = {0};\n    EXTI_ClearITPendingBit(EXTI_Line17);\n    EXTI_InitStructure.EXTI_Line = EXTI_Line17;\n    EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Event;\n    EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Rising;\n    EXTI_InitStructure.EXTI_LineCmd = ENABLE;\n    EXTI_Init(&EXTI_InitStructure);\n\n}\n\nvoid rtc_init(void)\n{\n    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);\n\n    PWR_BackupAccessCmd(ENABLE);\n    /* enable LSI */\n    RCC_LSICmd(ENABLE);  \n\n    /* wait for LSI to stabilize */\n    while (RCC_GetFlagStatus(RCC_FLAG_LSIRDY) == RESET);  \n\n    /* select LSI as rtc clock */\n    RCC_RTCCLKConfig(RCC_RTCCLKSource_LSI); \n    RCC_RTCCLKCmd(ENABLE);\n    RTC_WaitForLastTask();\n    RTC_WaitForSynchro();\n\n    /* enable Alarm interrupt */\n    RTC_ITConfig(RTC_IT_ALR, ENABLE);\n\n    RTC_WaitForLastTask();\n\n    /* set rtc prescaler value */\n    RTC_SetPrescaler(32767);  \n\n    RTC_WaitForLastTask();\n}\n\nint main(void)\n{\n\n   /* Configure unused GPIO as IPD to reduce power consumption */\n    GPIO_InitTypeDef GPIO_InitStructure = {0};   \n    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA|RCC_APB2Periph_GPIOB|\n             RCC_APB2Periph_GPIOC|RCC_APB2Periph_GPIOD|RCC_APB2Periph_GPIOE, ENABLE);\n    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_All;\n    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPD;\n\n    GPIO_Init(GPIOA, &GPIO_InitStructure);\n    GPIO_Init(GPIOB, &GPIO_InitStructure);\n    GPIO_Init(GPIOC, &GPIO_InitStructure);\n    GPIO_Init(GPIOD, &GPIO_InitStructure);\n    GPIO_Init(GPIOE, &GPIO_InitStructure);\n    /***************************************/\n\n\n    Delay_Init();\n    USART_Printf_Init(256000);\n\n    rtc_init();\n    rtc_exit17_init();\n\n    printf("ch32v307 standby mode wakeup by rtc test\\r\\n");\n    Delay_Ms(2000);\n    \n    /* set alarm event after 5s */\n    RTC_SetAlarm(RTC_GetCounter()+5);\n    RTC_WaitForLastTask();\n\n    /* set PWR register, need enable rcc of pwr */\n    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR, ENABLE); \n\n    /* standby mode, mcu will reset after wakeup event */\n    PWR_EnterSTANDBYMode();\n\n    printf("wakeup\\r\\n");\n\n    while(1)\n    {\n        printf("run in main loop\\r\\n");\n        Delay_Ms(1000);\n    }\n}\n'))))}u.isMDXComponent=!0}}]);