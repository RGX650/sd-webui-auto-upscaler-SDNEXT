<h1 align="center">sd-webui-auto-upscaler</h1>

<br/>

### 说明
自用的sd-webui插件，可以将目录下的所有图片按照设定的放大算法进行放大。

### 原理
读取图片的提示词，设置高清修复，重新进行文生图。

### 应用场景
在不勾选高清修复的情况下跑图，而后筛选掉效果不满意的图片，统一放进单个目录，然后批量放大。

### 特性
+ 支持不同提示词、不同宽高的图片

### Q & A

#### 1. 我为什么不勾选高清修复去跑图 / 我为什么要用这个插件？
> 勾选高清修复后生成图片更加耗时，而且无法保证出来的图片效果满意。建议以较低分辨率抽奖筛选出满意的照片后，再执行此插件一次性高清修复所有图片，节省时间。

#### 2. 我为什么不用图生图批量处理？
> 插件支持批量操作，自定义放大算法、倍数与重绘幅度，并且多张图片不同的提示词、不同的图片尺寸都会有对应处理。

#### 3. 如果多张图片的大模型是不一样的，会自动切换吗？
> 不会，暂时没有去研究。

#### 4. 我还是不懂，你能再说说吗？
> 相当于用原图的提示词、采样方法、步数、种子数等等，重新帮你跑一遍图，但是是勾选了高清修复的。




