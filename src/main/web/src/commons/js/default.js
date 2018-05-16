export const defualt = '# 欢迎使用Markdown编辑器写博客\r\n' +

  '本Markdown编辑器使用[StackEdit][6]修改而来，用它写博客，将会带来全新的体验哦：\r\n' +

  '- **Markdown和扩展Markdown简洁的语法**\r\n' +
  '- **代码块高亮**- **图片链接和图片上传**\r\n' +
  '- ***LaTex*数学公式**\r\n' +
  '- **UML序列图和流程图**\r\n' +
  '- **离线写博客**\r\n' +
  '- **导入导出Markdown文件**\r\n' +
  '- **丰富的快捷键** \r\n' +

  '-------------------\r\n' +

  '## 快捷键\r\n' +
  ' - 加粗    `Ctrl + B` \r\n' +
  '- 斜体    `Ctrl + I`- 引用    `Ctrl + Q`\r\n' +
  '- 插入链接    `Ctrl + L`\r\n' +
  '- 插入代码    `Ctrl + K`\r\n' +
  '- 插入图片    `Ctrl + G`\r\n' +
  '- 提升标题    `Ctrl + H`\r\n' +
  '- 有序列表    `Ctrl + O`\r\n' +
  '- 无序列表    `Ctrl + U`\r\n' +
  '- 横线    `Ctrl + R`\r\n' +
  '- 撤销    `Ctrl + Z`\r\n' +
  '- 重做    `Ctrl + Y`\r\n' +

  '## Markdown及扩展\r\n' +
  '> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    \r\n' +
  '—— <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank"> [ 维基百科 ]\r\n' +
  '使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.csdn.net)等，详细语法参考帮助？。\r\n' +
  '本编辑器支持 **Markdown Extra** , 　扩展了很多好用的功能。具体请参考[Github][2].  \r\n' +

  '### 表格\r\n' +
  '**Markdown　Extra**　表格语法：\r\n' +
  '项目     | 价格\r\n' +
  '-------- | ---\r\n' +
  'Computer | $1600\r\n' +
  'Phone    | $12\r\n' +
  'Pipe     | $1\r\n' +
  '可以使用冒号来定义对齐方式：\r\n' +
  '| 项目      |    价格 | 数量  |\r\n' +
  '| :-------- | --------:| :--: |\r\n' +
  '| Computer  | 1600 元 |  5   |\r\n' +
  '| Phone     |   12 元 |  12  |\r\n' +
  '| Pipe      |    1 元 | 234  |\r\n' +

  '###定义列表\r\n' +

  '**Markdown　Extra**　定义列表语法：\r\n' +
  '项目１\r\n' +
  '项目２\r\n' +
  '  :   定义 A\r\n' +
  '  :   定义 B\r\n' +
  '项目３\r\n' +
  '  :   定义 C\r\n' +
  '  :   定义 D\r\n' +
  '> 定义D内容\r\n' +

  '### 代码块\r\n' +
  '代码块语法遵循标准markdown代码，例如：\r\n' +
  '``` python\r\n' +
  '@requires_authorization\r\n' +
  'def somefunc(param1="", param2=0):\r\n' +
  '   "A docstring"\r\n' +
  '    if param1 > param2: # interesting\r\n' +
  '        print "Greater"\r\n' +
  '    return (param2 - param1 + 1) or None\r\n' +
  'class SomeClass:\r\n' +
  '    pass\r\n' +
  '>>> message = "interpreter"\r\n' +
  '```\r\n' +

  '###脚注\r\n' +
  '生成一个脚注[^footnote].\r\n' +
  '[^footnote]: 这里是 **脚注** 的 *内容*.\r\n' +

  '### 目录\r\n' +
  '用 `[TOC]`来生成目录：\r\n' +
  '[TOC]\r\n' +

  '### 数学公式\r\n' +
  '使用MathJax渲染*LaTex* 数学公式，详见[math.stackexchange.com][1].\r\n' +
  '- 行内公式，数学公式为：$\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$。\r\n' +
  '- 块级公式：\r\n' +
  '$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$'
