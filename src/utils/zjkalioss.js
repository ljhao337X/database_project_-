
let OSS = require('ali-oss');

let client = new OSS({
    accessKeyId: 'yourkey',
    accessKeySecret: 'yourkey',
    bucket: 'haha',
    region: 'haha'
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