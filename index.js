// 读取typora里面的文件夹，然后把文件夹里面的文件读取出来
const fs = require('fs')
const fileList = fs.readdirSync('./typora')
//如果notion中有同名的文件，略过，如果没有，则把文件夹里面的文件替换图片github地址并复制到notion中
const mdList = fileList.filter(item => item.endsWith('.md'))
console.log('mdList', mdList)

mdList.forEach(item => {
  console.log('fs.existsSync(`./notion/${item}`)', fs.existsSync(`./notion/${item}`))

  if (!fs.existsSync(`./notion/${item}`)) {
    const filePath = `./typora/${item}`
    const fileName = item.split('.')[0]
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const newFileContent = fileContent.replace(
      new RegExp(fileName + '\\/', 'g'),
      `https://raw.githubusercontent.com/mypridelife/notion_img/main/typora/${fileName}/`
    )
    console.log('newFileContent', newFileContent)

    fs.writeFileSync(`./notion/${item}`, newFileContent)
  }
})
