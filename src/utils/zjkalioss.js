
let OSS = require('ali-oss');

let client = new OSS({
    accessKeyId: 'LTAI5t6ZynHAm5cym7NPRMhB',
    accessKeySecret: 'pI6KHtIRcUpgYd0b9hqfY26RlDHQA5',
    bucket: 'database-project',
    region: 'oss-cn-zhangjiakou'
});

export async function put (filePath, file) {
    try {
        let result = await client.put(filePath, file)
        return result
    } catch (err) {
        console.log(err)
    }
}

// 删除
export async function remove (filePath) {
    try {
        let result = await client.delete(filePath)
        return result
    } catch (err) {
        console.log(err)
    }
}