---
sidebar_position: 3
description: 详细讲解 USB 5 种标准描述符
---

# 03_USB 描述符详解

USB 协议为 USB 设备定义了一套描述设备功能和属性的有固定结构的描述符。

USB 设备通过描述符反映自己的设备特性。

USB 描述符是由特定格式排列的一组数据结构组成。

USB描述符包含标准描述符、类描述符和厂商自定义描述符３种形式。

5 种标准描述符：

- 设备描述符（Device Descriptor)

- 配置描述符（Configuration Descriptor）

- 接口描述符（Interface Descriptor）

- 端点描述符（Endpoint Descriptor）

- 字符串描述符（String Descriptor）

    

![usb_descriptor](img\usb_descriptor.png)

详细描述见 USB_20 手册 9.6 章节。

## 1. 设备描述符（Device Descriptor）

设备描述符是 USB 主机枚举 USB 设备申请的第 1 个描述符，用来表示这个 USB 设备有哪些特征。

每个 USB 设备有且仅有一个设备描述符。

设备描述符的长度为固定 18 字节。

| 偏移量 | 名称               | 大小/字节 | 说明                                   |
| ------ | ------------------ | --------- | -------------------------------------- |
| 0      | bLength            | 1         | 描述符长度（18字节）                   |
| 1      | bDescriptorType    | 1         | 描述符类型（0x01）                     |
| 2      | bcdUSB             | 2         | 设备使用的 USB 协议版本                |
| 4      | bDeviceClass       | 1         | 类代码                                 |
| 5      | bDeviceSubClass    | 1         | 子类代码                               |
| 6      | bDeviceProtocol    | 1         | 设备使用的协议                         |
| 7      | bMaxPackeSize0     | 1         | 端点 0 最大包长（仅8，16，32，64合法） |
| 8      | idVender           | 2         | 厂商 ID                                |
| 10     | idProduct          | 2         | 产品 ID                                |
| 12     | bcdDevice          | 2         | 设备版本号                             |
| 14     | iManufacturer      | 1         | 描述厂商的字符串的索引                 |
| 15     | iProduct           | 1         | 描述产品的字符串的索引                 |
| 16     | iSerialNumber      | 1         | 产品序列号字符串的索引                 |
| 17     | bNumConfigurations | 1         | 可能的配置数，一个USB可能有多个配置    |

### 1.1 bLength

 描述符长度（18字节，十六进制为0x12），就是标志描述符数据结构的长度。

### 1.2 bDescriptorType

bDescriptorType代表了本描述符的类型，设备描述符为 0x01。

### 1.3 bcdUSB

USB协议版本，表示形式0xJJMN版本JJ.M.N（JJ  - 主要版本号，M  - 次要版本号，N  - 次要版本）。

 如：USB2.0，写成：0x0200H；USB1.1，写成：0x0110 如果是USB3.11，写成：0x0311。

### 1.4 bDeviceClass、bDeviceSubClass、bDeviceProtocol

bDeviceClass、bDeviceSubClass、bDeviceProtocol分别代表设备类型，子类型，设备使用的协议。

USB-IF区分设备类分了三个等级（类-子类-协议码）其中，类包含人机交互类、图像类、无线类、音频类等等；子类比如音频类的音频控制、音频流等等；协议比如人机接口类中的鼠标、键盘、触摸屏等。

详细 USB 设备类信息可到 [USB-IF 官网](https://www.usb.org/defined-class-codes)查看。

### 1.5 bMaxPackeSize0

端点 0 最大包长。

低速设备最大 8 字节。

全速和高速设备最大 64 字节。

### 1.6 idVender

 厂商ID，就是个2字节的编号，由USB协议分配，厂商申请时需要交费

### 1.7 idProduct

产品ID，厂家自行定义。

### 1.8 bcdDevice

产品版本号，厂家自行定义

## 2. 配置描述符（Configuration Descriptor）

一个USB设备至少有一个或者多个配置，具体配置数量由设备描述符 bNumConfigurations 决定。

每一种配置都对应一个**配置描述符集合**，包括标准配置描述符、接口描述符、端点描述符，如果是HID设备还会包括HID描述符。

一个标准的配置描述符组成如下：

| 偏移量 |        名称         | 大小/字节 |             说明              |
| :----: | :-----------------: | :-------: | :---------------------------: |
|   0    |       bLength       |     1     |    描述符长度，固定为 0x09    |
|   1    |   bDescriptorType   |     1     |       描述符类型，0x02        |
|   2    |    wTotalLength     |     2     |     配置描述符集合总长度      |
|   4    |   bNumInterfaces    |     1     |       配置支持的接口数        |
|   5    | bConfigurationValue |     1     |          该配置的值           |
|   6    |   iConfiguration    |     1     |  描述该配置的字符串的索引值   |
|   7    |    bmAttributes     |     1     |         该设备的属性          |
|   9    |      bMaxPower      |     1     | 设备所需的电流（单位为 2 mA） |



### 2.1 wTotalLength

配置描述符集合总长度，该集合中可能包含多个接口和端点描述符，该值为这些描述符长度之和。

### 2.2 bNumInterfaces

当前配置下的接口数量。

单一功能的设备只有一个接口，如键盘或者鼠标。

复合设备会有多个接口，如键鼠一体的复合设备。

### 2.3 bConfigurationValue

一个设备可能有多个配置，该值支持当前配置的标号。

### 2.4 iConfiguration

描述该配置的字符串的索引值，如果没有字符串，那该值为 0。

### 2.5 bmAttributes

该设备的属性。

Bit4-0 保留。

Bit5 表示是否支持远程唤醒，为 1 表示支持，为 0 表示不支持。

Bit6 表示供电方式，为 1 表示总线供电，为 0 表示自供电。

Bit7 保留，默认设置为 1。

### 2.6 bMaxPower

表示设备需要从总线获取的最大电流。单位为 2mA。

如需获得 100mA 的最大电流，则设置为 0x32。



## 3. 接口描述符（Interface Descriptor）

接口描述符不能单独返回给USB主机，主机会请求获得配置描述符集合，接口描述符必须附在配置描述符后面。

标准的接口描述符组成如下：

| 偏移量 |        名称        | 大小/字节 |            说明            |
| :----: | :----------------: | :-------: | :------------------------: |
|   0    |      bLength       |     1     |  描述符长度，固定为 0x09   |
|   1    |  bDescriptorType   |     1     |      描述符类型，0x04      |
|   2    |  bInterfaceNumber  |     1     | 该接口的编号（从 0 开始）  |
|   3    | bAlternateSetting  |     1     |      该接口的备用编号      |
|   4    |   bNumEndpoints    |     1     |   该接口所使用的端点数量   |
|   5    |  bInterfaceClass   |     1     |      该接口所使用的类      |
|   6    | bInterfaceSubClass |     1     |     该接口所使用的子类     |
|   7    | bInterfaceProtocol |     1     |     该接口所使用的协议     |
|   8    |   iConfiguration   |     1     | 描述该接口的字符串的索引值 |

### 3.1 bInterfaceNumber

表示该接口的编号。当一个配置有多个接口时，每个接口的编号都不相同。

从 0 开始依次递增对每个配置的接口进行编号。

### 3.2 bAlternateSetting

该接口的备用编号，编号规则同 bInterfaceNumber。

很少使用，通常设置为 0。

### 3.3 bNumEndpoints

表示该接口使用的端点数（不包括端点 0）。

如果为 0 ，则表示该接口不使用其他端点，只用默认的控制端点。

### 3.4 bInterfaceClass、bInterfaceSubClass、bInterfaceProtocol

bInterfaceClass、bInterfaceSubClass、bInterfaceProtocol 分别为接口所使用的类、接口所使用的子类以及接口所使用的协议。

这些都由 USB-IF 规定。跟设备描述符中的意义类似。

通常在接口中定义设备的功能，而在设备描述符中讲类、子类、协议都设置为 0x00。

### 3.5 iConfiguration

描述该接口的字符串索引值。如果为 0 则表示没有字符串描述符。

## 4. 端点描述符（Endpoint Descriptor）

端点描述符不能单独返回给USB主机，主机会请求获得配置描述符集合，端点描述符必须附在配置描述符后面一并返回。

标准的端点描述符的组成如下：

| 偏移量 |       名称       | 大小/字节 |          说明           |
| :----: | :--------------: | :-------: | :---------------------: |
|   0    |     bLength      |     1     | 描述符长度，固定为 0x07 |
|   1    | bDescriptorType  |     1     |    描述符类型，0x05     |
|   2    | bEndpointAddress |     1     |      该端点的地址       |
|   3    |   bmAttributes   |     1     |      该端点的属性       |
|   4    |  wMaxPackeSize   |     2     | 该端点支持的最大包长度  |
|   6    |    bInterval     |     1     |    该端点的查询时间     |



### 4.1 bEndpointAddress

Bit 3~0：端点号

Bit6~4：保留，设置为 0

Bit7：该端点的传输方向，1 为 Input，0 为 Output。

### 4.2 bmAttributes

Bit1 ~ 0：传输类型

- 00：Control 控制传输
- 01：Isochronous 同步传输
- 10：Bulk 批量传输
- 11：Interrupt 中断传输

Bit7~2：

- 如果该端点不是同步传输，则设置为 0
- 如果该端点为同步传输怎
    	- Bit3~2：表示同步的类型，00 为无同步，01 为异步，10 为适配，11 为同步
    	- Bit5~4：表示用途，00为数据端点，01为反馈端点，10 为暗含反馈的数据端点，11为保留值
    	- Bit7~6，保留。设置为00。

### 4.3 wMaxPackeSize

表示当前配置下此端点能够接收或发送的最大数据包的大小。

两个字节长度，低字节在前。

对于全速和低速模式，Bit10~0 表示端点的最大包长度，其他位保留位 0。

对于高速模式，Bit10~0 表示端点的最大包长度，Bit12~11 为每个帧附加的传输次数。其他位保留为 0 。

详细可参 USB2.0 协议第 5.9 章节。

### 4.4 bInterval

查询时间，就是主机多久和设备通讯一次，主机在枚举设备的时候会得到端点描述符，然后根据端点描述符这个值和此端点进行对应的数据交互，也就是主机多久给端点发送一次数据请求。根据设备运行速度以帧或微帧表示，低速和全速称为帧，下面的一个值代表1ms，高速称为微帧，一个值代表125us。

对于全速/高速同步端点，此值必须在 1 到 16 之间。（bInterval-1）值用作2的指数，例如bInterval为 4，表示周期为 8 个单位；

对于全速/低速中断端点，该字段的值可以是1到255，也就是主机多少ms给设备发一次数据请求；

对于高速中断端点，使用（bInterval-1）值作为 2 的指数，例如bInterval为 4 表示周期为 8。这个值必须在 1 到 16 之间；

对于高速批量/控制输出端点，bInterval 必须指定端点的最大NAK速率。值 0 表示端点永不 NAK。其它值表示每个微帧的 bInterval*125us 时间最多 1 个NAK。这个值的范围必须在 0 到 255 之间。

## 5. 字符串描述符（String Descriptor）

为了提供比较友好的设备标识，USB规范中定义了字符串描述符，即使用人类的自然语言来描述设备的功能，生产厂家，生产序列号等。

字符串描述符是可选的。如果不支持字符串描述符，其设备描述符、配置描述符、接口描述符内的所有字符串描述符索引都必须为０。

USB字符串统一使用 UNICODE 编码。

### 5.1 语言 ID 描述符

语言 ID 描述符也是字符串描述符的一种，要添加字符串描述符必须要使用语言 ID 描述符告诉主机该设备支持哪些国家的语言。

语言 ID 描述符的索引值为 0。

语言 ID 描述符组成如下：

| 偏移量 |      名称       | 大小/字节 |                 说明                 |
| :----: | :-------------: | :-------: | :----------------------------------: |
|   0    |     bLength     |     1     | 描述符长度（不定），根据实际长度填写 |
|   1    | bDescriptorType |     1     |           描述符类型，0x03           |
|   2    |   wLANGID[0]    |     2     |             语言 ID 号 0             |
|  ...   |       ...       |    ...    |                 ...                  |
| 2*n+2  |   wLANGID[n]    |     2     |             语言 ID 号 n             |

常用的语言ID ：

- 中文 ID： 0x1404
- US English ID：0x0409

### 5.2 字符串描述符

字符串描述符组成如下：

| 偏移量 |      名称       | 大小/字节 |                 说明                 |
| :----: | :-------------: | :-------: | :----------------------------------: |
|   0    |     bLength     |     1     | 描述符长度（不定），根据实际长度填写 |
|   1    | bDescriptorType |     1     |           描述符类型，0x03           |
|   2    |     bString     |   不定    |         UNICODE 编码的字符串         |



## 参考

- [USB 2.0 Specification](https://www.usb.org/sites/default/files/usb_20_20211008.zip)
