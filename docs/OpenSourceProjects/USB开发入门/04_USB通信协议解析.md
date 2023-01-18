---
sidebar_position: 4
description: USB通信协议解析
---

# 04_USB 通信协议解析

USB 采用一问一答的传输方式，物理传输双方角色一定是主机和设备。通信过程都是由**主机发起**的，设备端只能被动的响应。

## 1. 编码方式

USB 1.0/2.0 采用反向不归零（NRZI,No Return Zero-Inverse）的编码方式，规则为：

- 数据为 0 翻转电平，数据为 1 不翻转。
- 位填充：在数据进行NRZI编码前，每 6 个连续的1信号之后都会插入 1 个 0 信号，以免电平不能突变丢失同步。
- 位传输的顺序以 LSB 优先

![usb_NRZI](img\usb_NRZI.png)

USB 3.0 采用的是 8b/10b 编码。

USB 3.1/3.2 采用的是 128/132 (64b/66b) 编码。

## 2. 信号传输状态

- 差分 0：D+ ≈ 0V，D- ≈ 3V

- 差分 1：D+ ≈ 3V，D- ≈ 0V

- J  状态：Low Speed -> 差分 0，Full Speed -> 差分 1 

- K 状态：Low Speed -> 差分 1，Full Speed -> 差分 0 

- SE0 （Single ended zero）：D+ 和 D- 都为 0 V

- SE1（Single ended one） ：D+ 和 D- 都大于 0.8 V

:::tip

详见 USB_20 手册 7.1.7 小节

:::

## 3. 总线调度

USB 作为一个高速总线，它需要充分利用起其带宽，并且能承担其多种业务类型的数据包的传输。

对数据传输来说，最重要的有几种因素 **带宽、时间延迟、完整性校验**。

根据这几种因素的组合，USB 把数据传输分成了4类：

| Type                                        | KeyPoint                   | Sample        | Description                                                  |
| ------------------------------------------- | -------------------------- | ------------- | ------------------------------------------------------------ |
| Control Transfers<br/>控制传输              | 完整性校验                 | USB 配置命令  | 突发的、非周期性的，主机软件发起的请求/响应通信，通常用于命令/状态操作。<br/>数据量小对带宽、时间延迟要求不高，但是要求数据必须正确 |
| Isochronous Transfers<br/>等时传输/同步传输 | 带宽、时间延迟             | USB 摄像头    | 主机和设备之间定期、连续的通信，通常用于时间相关信息。<br/>这种传输类型还保留了数据中封装的时间概念。然而，这并不意味着这些数据的交付需求总是时间紧迫的。<br/>数据量大需要大带宽、对时间延迟也很高，但是不要求数据必须正确。也正因为前两者的要求高，也很难做到数据校验和重传 |
| Interrupt Transfers<br/>中断传输            | 时间延迟、完整性校验       | 键盘、鼠标    | 低频、有边界延迟通信。<br/> 对时间延迟要求高，但数据量小所以要求数据必须正确 |
| Bulk Transfers<br/>批量传输                 | 带宽、时间延迟、完整性校验 | 文件存储、U盘 | 非周期性、大包突发通信，通常用于可以使用任何可用带宽的数据，也可以延迟到带宽可用。<br/>数据量大需要大带宽，但对时间延迟也不高，要求数据必须正确。也正因为对延迟要求不高，所以可以做数据校验和重传 |

USB使用以下方法来满足多种类型的数据在一条共享通道上传输：

- 时间延迟。从时间维度上把数据传输切成多个时间片，在每个时间片内绝大部分份额(最多80%)优先传输对时间延迟有要求的数据，如Interrupt Transfers、Isochronous Transfers。在时间片剩下的额度内传输对时间延迟没要求的数据，如Control Transfers、Bulk Transfers。
- 完整性校验。对需要保证数据完整性的数据加上了CRC 校验，接收端使用 ACK 来知会发送端正确接收，如果没有收到 ACK 发端会尝试重发 3 次。

### 3.1 帧/微帧

![usb_frames_microframes](img\usb_frames_microframes.png)

如上图，USB 从时间维度上把数据传输切成多个时间片：

- Frames。Low-speed 和 Full-speed 的时间切片大小为 1ms，USB 控制器每1ms重新调度一下传输。
- Microframes。High-speed 的时间切片大小为 125us，USB 控制器每125us重新调度一下传输。这个时间切片，和操作系统上 schedule tick 的概念是一样的。



## 4. 协议传输格式

在数据格式传输上又会进一步细分：

- **传输 Transfer**，每个时间片的所有传输称之为一个 Transfer，或者称一个 Frames/Microframes。
- **事务Transcation**，根据某次数据传输的目的，一个 Transfer 可以分成多个 Transcation 事务。
- **包 Packet**，数据传输的**最小单位**，一个 Transcation 可能由多个 Packet 事务组成。

![usb_packet_composition](img\usb_packet_composition.png)

### 4.1 包 Packet

Packet 由 SOP（Start of Packet）起始包、SYNC 同步域、Packet Content、EOP（End of Packet）结束包组成。

Packet Content 包内容通常由 PID（包 ID）、地址（可选）、帧号（可选）、数据（可选）、CRC（可选）这几个域组成。

- **SOP 起始包**

    起始包SOP（Start Of Packet），通过将 D+ 和 D- 线从空闲状态驱动到相反的逻辑电平（K 状态），由始发端口发信号通知分组的开始（SOP）。

-  **SYNC 同步域**

   - 低速或全速的同步域为00000001
   - 高速的同步域为31个0，后面为一个1
   
- **EOP 结束包**

  全速或低速设备的结束包：SE0 状态用于发信号通知分组结束（EOP）。 通过将 D+ 和 D- 驱动到 SE0 状态两位时间，然后将线路驱动到 J 状态一位时间来发信号通知 EOP。 从 SE0 到J状态的转换定义了接收器处的分组的结束。 J 状态被置位一个位时间，然后 D+ 和 D- 输出驱动器都处于高阻态。 总线终端电阻将总线保持在空闲状态。
  
- **PID（包 ID）**
  
  USB协议定义的包格式 PID 由 8 位组成，低 4 位是类型字段，高4位为低四位的反码。
  
  根据 PID 的内容，包可以分为四大类：
  
  - 令牌包（Token Packet）
  
  - 数据包（Data Packet）
  
  - 握手包（Handshake Packet）
  
      | PID Type       | PID Name | PID< 3:0 > | Description                                                  |
      | -------------- | -------- | ---------- | ------------------------------------------------------------ |
      | 令牌 Token     | OUT      | 0001B      | 主机发送数据到USB设备                                        |
      | 令牌 Token     | IN       | 1001B      | 主机接收从USB设备发出的数据                                  |
      | 令牌 Token     | SOF      | 0101B      | 作为一个帧或者小帧的开始信息                                 |
      | 令牌 Token     | SETUP    | 1101B      | 主机向USB设备发送配置信息                                    |
      | 数据 DATA      | DATA0    | 0011B      | 数据偶数包                                                   |
      | 数据 DATA      | DATA1    | 1011B      | 数据奇数包                                                   |
      | 数据 DATA      | DATA2    | 0111B      | 作为一个高速同步事务的专用数据包                             |
      | 数据 DATA      | MDATA    | 1111B      | 作为一个SPLIT事务的专用数据包                                |
      | 握手 Handshake | ACK      | 0010B      | 数据接收正确                                                 |
      | 握手 Handshake | NAK      | 1010B      | 数据接收不正确                                               |
      | 握手 Handshake | STALL    | 1110B      | 使用的端点被挂起                                             |
      | 握手 Handshake | NYET     | 0110B      | 接收方没有响应                                               |
      | Special        | PRE      | 1100B      | 低速数据的先导包                                             |
      | Special        | ERR      | 1100B      | SPLIT事务中表示出现错误，复用PRE Value， |
      | Special        | SPLIT    | 1000B      | 高速主使用该SPLIT事务解决从高速模式到低速和全速模式的转换    |
      | Special        | PING     | 0100B      | 仅用于高速模式下主机使用该事务判断设备是否可以接收数据       |
  
      > 参考usb2.0手册 Table 8-1
  
  
  
- **地址**
  
  地址包括设备地址和端点地址。其中设备地址占 1 byte，端点地址占 4 bit
  
- **帧号**
  
  占 11 bit。主机没发出一个帧，帧号会自动加 1，当帧号到达0x7ff（2047）时，将归零重新计算。
  
  仅在每个帧的帧首传输一次 SOF 包。 
  
- **数据域**
  
  为USB传输的数据。对于不同的USB传输类型，数据域的数据长度从0到1024字节不等。
  
- **CRC 校验域**
  
    CRC校验域分为令牌校验域和数据校验域
  
  - 令牌Token CRC校验域
      计算地址域和帧号域的 CRC：$\ G(X) = X^5 + X^2 + 1$

  - Data CRC
      计算数据域数据的 CRC： $\ G(X) = X ^{16} + X^{15} + X^2 + 1$

> 在线CRC校验 ：http://www.ip33.com/crc.html 
>
> 基于C语言的CRC校验库，包括常用的21个CRC参数模型实现 https://github.com/whik/crc-lib-c

### 4.2 事务 Transaction

一个USB事务一般包含三个包：

- 令牌包，指名了该事务的传输的类型，包括目标设备的地址和端点。
- 数据包，有些事务可以没有数据，数据的长度不得超过该端点的最大包大小。
- 握手包，对有数据或无数据传输的结果进行反馈，如SET_ADDRESS请求就无数据包。

>- USB事务是根据端点大小的进行数据传输的最小的可靠传输单元。
>- USB传输由于需要传递的数据一般会大于端点大小，所以一数据传输会分成几个事务，而且USB所有数据传输都是由主机发起的，所以最前面也有一个令牌事务。
>- USB事务保证了单次数据传输的可靠性，而多个事务（包括发送与接收数据）组成了一次可靠的USB传输，在控制传输中叫请求，在中断传输、批量传输或者同步传输中叫一个完整的数据包。

### 4.3 传输 Transfer

从时间维度来看，USB 通信是有系列传输（Transfer）组成，包括四种传输类型：

- 控制传输 Control Transfers
- 同步传输 Isochronous Transfers
- 中断传输 Interrupt Transfers
- 批量传输 Bulk Transfers



## 参考

- [USB 2.0 Specification](https://www.usb.org/sites/default/files/usb_20_20211008.zip)
- [Linux usb 1. 总线简介](https://www.cnblogs.com/pwl999/p/15534962.html)
- [USB中文网](https://www.usbzh.com/article/detail-144.html)
