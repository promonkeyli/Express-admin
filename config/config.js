/**
 * 全局配置
 */
module.exports = {
    dbUri: 'mongodb://localhost:27017/system-admin?retryWrites=false',
    PORT :  process.env.PORT || 3000,
    jwtSecret: 'c46c07ce-5b05-11ec-bf63-0242ac130002' // 根据uuid生成的jwt sceret
}