# IPFS：替代HTTP的分布式网络协议

​	今年年初，[Internet Archive](https://archive.org/)开始[倡导](http://blog.archive.org/2015/02/11/locking-the-web-open-a-call-for-a-distributed-web/)分布式网络。现在关于它的声音已经变得越来越清晰而又响亮。而[IPFS](http://ipfs.io/)就是在这种环境下出现的一个典型的开源代表。IPFS是点对点协议InterPlanetary File System的简称，它是一个面向全球的、点对点的分布式版本文件系统，试图将所有具有相同文件系统的计算设备连接在一起。

​	近日，IFPS[宣布](https://ipfs.io/ipfs/QmNhFJjGcMPqpuYfxL62VVB9528NXqDNMFXiqN5bgFYiZ1/its-time-for-the-permanent-web.html)了一个未来web发展计划，它用基于内容的地址替代基于域名的地址，也就是用户寻找的不是某个地址而是储存在某个地方的内容，不需要验证发送者的身份，而只需要验证内容的哈希，通过这样可以让网页的速度更快、更安全、更健壮、更持久。IPFS表示，IPFS未来将替代HTTP（以及其他的许多东西）。

## HTTP存在很多问题

### HTTP鼓励高度集中化

​	Web的本意是去中心化，但它却变得越来越中心化，今天越来越多的人依靠的是少数网站的服务。HTTP变成了一个脆弱的、高度集中的、无效的、过度依赖于骨干网的协议。像美国国家安全局这样的组织，现在只需要在几个点上拦截通信来进行监视。对政府来说，阻止网站访问这些高度集中化的资源变得容易。这也使通信容易遭受[DDoS攻击](https://github.com/blog/1796-denial-of-service-attacks)而面临巨大的风险。

![](http://cdn.infoqstatic.com/statics_s2_20170111-0710/resource/articles/ipfs/zh/resources/1012006.jpg)

​	将web进行去中性化，可以降低极少数强大组织的延展性，并提高所有站点的自由度和独立性，同时也降低了由于服务器中断造成数据丢失的风险。

### HTTP是低效的

​	当内容过度集中化之后，这让数据中心高度依赖于Internet骨干网。这样除了有利于政府对内容进行封锁和审查，事实上存在很多可靠性问题。即使允许冗余，主要的骨干有时还是会被[损坏](http://en.wikipedia.org/wiki/2008_submarine_cable_disruption)，或者出现[路由表失控](https://blog.cloudflare.com/why-google-went-offline-today-and-a-bit-about/)，其[后果可能是非常严重](https://www.youtube.com/watch?v=VlKisWR74mU)。Internet骨干网并不健全，其很容易被攻击，同时一些重要的光纤线路被切断时服务很容易遭受影响。

## IPFS如何解决了这些问题

​	IPFS从根本上改变了用户搜索的方式。通过IPFS，用户搜索的是内容。通过HTTP浏览器搜索文件的时候，首先找到服务器的位置（IP地址），然后使用路径名称在服务器上查找文件。按照这个设计，只有文件所有者可以判断这是否是用户要找的文件。此时，必须保证托管者不会通过移除文件或者关闭服务器而对文件做任何更改。

​	当文件被添加到IPFS节点上，它得到一个新的名字。这个名字实际上是一个[加密哈希](http://en.wikipedia.org/wiki/Cryptographic_hash_function)，它是从文件内容中被计算出来。通过加密保证该哈希始终只表示该文件的内容。哪怕只在文件中修改一个比特的数据，哈希都会完全不同。

​	当下一步向IPFS分布式网络询问哈希的时候，它通过使用一个[分布式哈希表](https://en.wikipedia.org/wiki/Distributed_hash_table)，可以快速（在一个拥有10,000,000个节点的网络中只需要20跳）地找到拥有数据的节点，从而检索该数据，并使用哈希验证这是否是正确的数据。

​	IPFS是通用的，并且存储限制很少。它服务的文件可大可小，对于一些大的文件，它会自动将其切割为一些小块，使IPFS节点不仅仅可以像HTTP一样从一台服务器上下载文件，而且可以从数百台服务器上进行同步下载。IPFS网络是一个细粒度的、不可靠的、分布式的、易联合的内容分发网络（Content Delivery Network , CDN）。对于所有数据类型都是很有用的，包括图像、视频流、分布式数据库、操作系统、blockchains等，而对于IPFS来说，最重要的是静态web网站。

​	IPFS文件也可以是特殊的IPFS目录对象，它允许用户使用人类可读的文件名，透明地链接到其他IPFS哈希。用户可以通过默认方式加载目录中的index.html，这也是标准的HTTP服务器采用的方式。使用目录对象，IPFS可允许用户采用完全相同的方式生成静态网站。将web网站添加到IPFS节点中只需要一个简单的命令：`ipfs add -r yoursitedirectory`。在此之后，用户可以从任何IPFS节点访问，而不需要链接到HTML上的任何哈希。

### 与IPFS建立联盟的数据

​	IPFS不需要每个节点存储所有发布到IPFS上的内容。相反，每个节点只存储自己想要的数据。如果每个节点托管一点数据，所有数据通过累积就提供了比任何集中式HTTP更多的空间、带宽和可用性。分布式网络将很快成为世界上最快、最可用、以及最大的数据存储。没有人有能力关闭所有的节点，所以数据永远不会丢失。

​	从其他IPFS节点复制、存储web网站很容易。它只需要一条命令以及网站的哈希值：`ipfs pin add -r QmcKi2ae3uGb1kBg1yBpsuwoVqfmcByNdMiZ2pukxyLWD8`。IPFS负责剩下的所有工作。

### IPNS

​	IPFS哈希代表不可变的数据，这意味着它们是不能被更改的，否则会导致哈希值的变更。这是一件好事，因为它鼓励数据的持久性，但我们仍然需要一种方法来找到最新的IPFS哈希以表示你的网站。IPFS通过一种特殊的功能来实现，即IPNS。

​	IPNS允许用户使用一个私有密钥来对IPFS哈希附加一个引用，使用一个公共密钥哈希（简称pubkeyhash）表示你的网站的最新版本。如果用户使用过比特币，可能会对此比较熟悉，一个比特币地址也是一个pubkeyhash。

​	如果该链接不起作用，不用担心。能够通过更改pubkeyhash所指向的内容，而pubkeyhash却永远保持不变。这样，网站的更新问题就得到了解决。

​	接下来，只需要保证这些网站的位置是人类可读的，所有问题就解决了。

### 人类可读的可变地址

​	IPFS/ IPNS哈希是一些很大的、难看的字符串，而且不容易记住。所以IPFS允许用户使用现有的域名系统（Domain Name System, DNS）来为IPFS/IPNS内容提供人类可读的链接。它允许用户通过在域名服务器上将哈希插入TXT记录来实现这一点（如果你方便使用一个命令行，运行如下命令：`dig TXT ipfs.git.sexy`）。具体可以参考[这里](http://ipfs.io/ipns/ipfs.git.sexy/)。

​	未来，IPFS已计划支持[Namecoin](http://namecoin.info/)，它理论上可以用来创建一个完全去中心化的、分布式的web，整个环境中不需要一个中心控制。没有ICANN，没有中央服务器，没有“权威”证书，也没有瓶颈。这听起来很疯狂。可现实的确疯狂。因为使用今天的技术这是完全可以实现的！

### IPFS HTTP网关：新旧网络之间的桥梁

​	通过一个HTTP网关，IPFS可以实现从HTTP到IPFS的过度，浏览器可以完全实现IPFS之前，现在已经允许当前的web浏览器访问IPFS。用户很快就可以切换到IPFS，完成web网站的存储、分发和服务。

​	到目前为止，IPFS还处于实验阶段。当网站更新的时候，Neocities将每天发布一个哈希IPFS。这个哈希将指向该网站的最新版本，并通过IPFS HTTP网关可以访问。因为每次更新IPFS哈希都会变更，这也能够为所有网站提供一个存档历史记录。

​	从长期来看，如果一切顺利的话，Neocities希望使用IPFS存储所有的网站，并为每个网站发布IPNS键。这将让用户可以不依赖于Neocities而进行内容发布。如果构建得当，即使Neocities不存在了，用户仍然可以更新自己的网站。通过有效地去除网站对Neocities中央服务器的依赖，这种集中控制环境将被永久性打破。

### IPFS真正能够替代HTTP可能还需要一段时间，而且也有很多工作要做。

​	通过与[协议实验室](http://ipn.io/)（Protocol Labs）合作，[Neocities](https://neocities.org/)已经成为产业界实施IPFS第一大网站。从9月8日开始，所有Neocities站点可以为世界上任何IPFS节点提供查看、存档和托管功能。当一个IPFS节点选择从Neocities上托管一个网站的时候，即使Neocities关闭了或停止对它托管，网站的原始版本仍继续可用。使用Neocities网站的IPFS节点越多，Neocities网站越容易访问。

​	目前，IPFS仍处于alpha开发阶段。它还没有取代现有的网站存储系统。如同任何复杂的新技术，它还存在很多需要的改进地方。但IPFS不是雾件，现在已经可以开始工作，感兴趣的用户可以[下载软件](https://gobuilder.me/github.com/ipfs/go-ipfs/cmd/ipfs)安装到电脑上。

