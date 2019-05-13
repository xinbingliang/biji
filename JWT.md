# JWT

## 构成

````
Header.Payload.Signature
头部.负载.签名
````

### Header

````
{
  "alg": "HS256",
  "typ": "JWT"
}
````

* `alg`：表示签名的算法（algorithm），默认是 `HMAC SHA256`（写成 HS256）
* `typ`：表示这个令牌（token）的类型（type），JWT 令牌统一写为`JWT`

### Payload

#### 官方规定的字段

- iss (issuer)：签发人
- exp (expiration time)：过期时间
- sub (subject)：主题
- aud (audience)：受众
- nbf (Not Before)：生效时间
- iat (Issued At)：签发时间
- jti (JWT ID)：编号

### Signature





