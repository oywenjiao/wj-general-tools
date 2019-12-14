'use strict';

const redis = require('redis');
const Promise = require('bluebird');
// 对redis中的方法做同步处理
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

class Redis {
    constructor(config) {
        this.client = redis.createClient(config);
    }

    /** ============================ stirng 字符串类型操作方法 ============================ */

    /**
     * 存储字符串类型的key
     * @param name
     * @param value
     * @returns ok
     */
    set(key, value) {
        return this.client.setAsync(key, value)
    }

    /**
     * 获取指定key的值
     * @param name
     * @returns {*}
     */
    get(key) {
        return this.client.getAsync(key)
    }

    /**
     * 删除指定key
     * @param name
     */
    del(key) {
        this.client.delAsync(key)
    }

    /** ============================ list 列表类型操作方法 ============================ */

    /**
     * 将给定值推入列表的右端
     * @param key
     * @param value 支持字符串和数组
     */
    rpush(key, value) {
        return this.client.rpushAsync(key, value)
    }

    /**
     * 将给定值推入列表的左侧
     * @param key
     * @param value 支持字符串和数组
     */
    lpush(key, value) {
        return this.client.lpushAsync(key, value)
    }

    /**
     * 获取列表指定范围内的所有数据
     * 0,-1 返回所有值
     * @param key
     * @param start 开始位置
     * @param end 结束位置
     * @returns {*}
     */
    lrange(key, start, end) {
        return this.client.lrangeAsync(key, start, end);
    }

    /**
     * 获取列表中指定下标的值
     * @param key
     * @param index 下标位置，从0开始
     * @returns {*}
     */
    lindex(key, index) {
        return this.client.lindexAsync(key, index);
    }

    /**
     * 从列表的右端弹出一个值
     * @param key
     * @returns {*}
     */
    rpop(key) {
        return this.client.rpopAsync(key);
    }

    /**
     * 从列表的左端弹出一个值
     * @param key
     * @returns {*}
     */
    lpop(key) {
        return this.client.lpopAsync(key);
    }

    /**
     * 删除指定范围内的值
     * @param key
     * @param start
     * @param end
     * @returns {*}
     */
    ltrim(key, start, end) {
        return this.client.ltrimAsync(key, start, end)
    }

    /** ============================ set 集合数据类型操作方法 ============================ */

    /**
     * 往集合中插入数据
     * @param key
     * @param value 多个值之间用逗号分隔
     * @returns {*}
     */
    sadd(key, ...value) {
        return this.client.saddAsync(key, value);
    }

    /**
     * 返回集合中所有的值
     * @param key
     * @returns {*}
     */
    smembers(key) {
        return this.client.smembersAsync(key);
    }

    /**
     * 从集合中随机取出一个值
     * @param key
     * @returns {*}
     */
    spop(key) {
        return this.client.spopAsync(key);
    }

    /**
     * 检查指定的值是否存在
     * @param key
     * @param value
     * @returns {*}
     */
    sismember(key, value) {
        return this.client.sismemberAsync(key, value);
    }

    /**
     * 删除集合中指定的值
     * @param key
     * @param value
     * @returns {*}
     */
    srem(key, value) {
        return this.client.sremAsync(key, value);
    }

    /**
     * 获取集合中元素数量
     * @param key
     * @returns {*}
     */
    scard(key) {
        return this.client.scardAsync(key);
    }

    /** ============================ hash 类型操作方法 ============================ */

    /**
     * 在指定的key中存储键值对数据
     * @param key
     * @param name 键名
     * @param value 值
     * @returns {*}
     */
    hset(key, name, value) {
        return this.client.hsetAsync(key, name, value);
    }

    /**
     * 在指定的key中取出键的值
     * @param key
     * @param name
     * @returns {*}
     */
    hget(key, name) {
        return this.client.hgetAsync(key, name);
    }

    /**
     * 取出key中所有的键值对数据
     * @param key
     * @returns {*}
     */
    hgetall(key) {
        return this.client.hgetallAsync(key);
    }

    /**
     * 删除key中指定的键
     * @param key
     * @param name
     * @returns {*} 存在在返回1，不存在返回0
     */
    hdel(key, name) {
        return this.client.hdelAsync(key, name);
    }

    /**
     *在指定的key中一次存储多个键值对
     * @param key
     * @param obj json类型的键值对
     * @returns {*}
     */
    hmset(key, obj) {
        return this.client.hmsetAsync(key, obj);
    }

    /**
     * 取出key中多个键的值
     * @param key
     * @param arr
     * @returns {*}
     */
    hmget(key, arr) {
        return this.client.hmgetAsync(key, arr);
    }

    /**
     * 返回key中键值对数量
     * @param key
     * @returns {*}
     */
    hlen(key) {
        return this.client.hlenAsync(key)
    }

    /**
     * 检查key中指定的键是否存在
     * @param key
     * @param name
     * @returns {*}
     */
    hexists(key, name) {
        return this.client.hexistsAsync(key, name)
    }

    /**
     * 获取key中所有的键
     * @param key
     * @returns {*}
     */
    hkeys(key) {
        return this.client.hkeysAsync(key)
    }

    /** ============================ zset 有序集合类型操作方法 ============================ */

    /**
     * 在有序集合的指定的key中存储 value => score
     * @param key
     * @param score
     * @param value
     * @returns {*}
     */
    zadd(key, score, value) {
        return this.client.zaddAsync(key, score, value)
    }

    /**
     * 返回指定key中指定范围的值
     * @param key
     * @param start
     * @param end
     * @returns {*}
     */
    zrange(key, start, end) {
        return this.client.zrangeAsync(key, start, end);
    }

    /**
     * 返回有序集合元素数量
     * @param key
     * @returns {*}
     */
    zcard(key) {
        return this.client.zcardAsync(key);
    }

    /**
     * 获取指定元素在有序集合中的排名
     * @param key
     * @param value
     * @returns {*}
     */
    zrank(key, value) {
        return this.client.zrankAsync(key, value);
    }

    /**
     * 获取指定元素的score值
     * @param key
     * @param value
     * @returns {*}
     */
    zscore(key, value) {
        return this.client.zscoreAsync(key, value);
    }

}

module.exports = Redis;

