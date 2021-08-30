# AUTH and KYC VERIFICATION

Powered by Nodejs , express , mongodb.

## Features

- User Registration
- User Login
- All Authentication feature
- Role management
- Three step KYC verification (user & admin both functionality)

### Installation

if you don't have nodejs installed. Install it. then install yarn and nodemon .

```
npm install -g yarn
npm install -g nodemon
```

or

```
sudo npm install -g yarn
sudo npm install -g nodemon
```

then go to the project root folder and install all node packages by,

```
yarn
```

then you need to run local mongodb or cloud mongodb. copy the mongodb url and paste in the `.env` file's `DB=` string.

### Run the server

Now run the server by using this command,

```
nodemon server.js
```

it will run on port `8000`.

## API

### USER REGISTRATION

Endpoint: `/api/user`
Method `post`

```
{
    "nickname": "name",
    "email": "user@mail.com",
    "password": "password"
}
```

### USER LOGIN

Endpoint: `/api/user/login`
Method `post`

```
{
    "username": "email or nickname",
    "password": "password"
}
```

### Update Password / Change Password

Endpoint: `/api/user/change-password`
Method `put`
Authentication `Bearer jwttoken`

```
{
    "prevPassword" : "password",
    "newPassword" : "123456789"
}
```

### Request Forget Password

Endpoint: `/api/user/forgot-password`
Method `post`

```
{
    "email" : "user2@mail.com"
}
```

### Reset Password from Mail

Endpoint: `/api/user/reset-password`
Method `post`

```
{
    "token" : "26367433b2a8fe3b62ff236dd622e8969353784f42a1ab8d76cd2ca197572523",
    "password" : "password"

}
```

### SUBMIT KYC DOCUMENT and info

#### STEP - Basic

Endpoint: `/api/kyc/submit`
Method `post`
Authentication `Bearer jwttoken`
Type `multipart/form-data`

```
step: basic
attachments : file/ files
firstName,
lastName,
country,
birthdate - format(dd/mm/yyyy)
```

#### STEP - Intermediate

Endpoint: `/api/kyc/submit`
Method `post`
Authentication `Bearer jwttoken`
Type `multipart/form-data`

```
step: intermediate
attachments : file/ files
cardNo,
cardType,
```

#### STEP - Advance

Endpoint: `/api/kyc/submit`
Method `post`
Authentication `Bearer jwttoken`
Type `multipart/form-data`

```
step: advance
attachments : file/ files
presentAddress,
parmanentAddress,
city,
state,
zip
```

### CHECK KYC ALL DOCUMENT

(only admin / moderator)

Endpoint: `/api/kyc`
Method `get`
Authentication `Bearer jwttoken`

### CHECK KYC DOCUMENT BY USER ID

(only admin / moderator)

Endpoint: `/api/kyc/{userid}`
Method `get`
Authentication `Bearer jwttoken`

### CHECK IMAGES

Endpoint: `/image/{image-file-name}`

### VERIFY KYC

(only admin / moderator)

Endpoint: `/api/kyc/{userid}/verify`
Method `PUT`
Authentication `Bearer jwttoken`

### REJECT KYC

(only admin / moderator)

Endpoint: `/api/kyc/{userid}/cancel`
Method `PUT`
Authentication `Bearer jwttoken`

### REGISTER AS PROSPECT

(only user)

Endpoint: `/api/user/role/prospect`
Method `PUT`
Authentication `Bearer jwttoken`

### REGISTER AS INVESTOR

(only user)

Endpoint: `/api/user/role/investor`
Method `PUT`
Authentication `Bearer jwttoken`

### ETHEREUM WALLET

API (not finished)

Utility function

- `getWeb3` , `getContract` function to get web3 provider and contract instance

- `initWeb3` , initialize web3 provider with `JSON RPC URL`

- `balance` utility function created for check ETH balance of an address

- `brodcast` utility function to brodcast a raw Transaction

- `tokenBalance` utility function to check Any standard ERC20 token balance

- `\utils\ethereum\index.js` for mapping all utility class

Wallet class

- `\utils\wallet\index.js` Wallet class

- wallet initialization
- wallet decryption
- create raw transaction
- transfer ethereum
- initialize erc20 token
- create raw transaction for erc20 token transfer

Encryption

- utils\Encryption.js for encrypt and decrypt wallet

Model

- Wallet database Model , one to one relationship with user model

Contracts

- ERC20 Contract abi

middleware

- `rateLimitMiddleWare` for restrict API access between 30 seconds. (forgotpassword)

New Utility function Added

- wallet creation function

- wallet default encrypt

- wallet double encrypt using site KEY

- Wallet decryption

- getWallet function

### Wallet API

#### get Balance

Endpoint `/wallet/balance`
Method `GET`
Authentication `Bearer jwttoken`

#### get address

Endpoint `/wallet/address`
Method `GET`
Authentication `Bearer jwttoken`

#### export wallet (only Admin)

Endpoint `/wallet/decrypt-wallet`
Method `GET`
Authentication `Bearer jwttoken`

### now wallet will be created while user register any account

#### Create Transaction

Endpoint `/wallet/transfer/{network}`
Method `POST`
Authentication `Bearer jwttoken`

Params : network -> eth (deafult)

##### Request Body :

```

{
    "currency" : "eth",
    "amount" : "0.0001",
    "to" : "0xFB4428cf772c560B7c66b254Ad6BeB7cf4abFeA4"
}

```

##### Transfer token

```
{
    "currency" : "tokenSymbol",
    "amount" : "0.0001",
    "to" : "0xFB4428cf772c560B7c66b254Ad6BeB7cf4abFeA4"
}
```

#### Response :

```
{
    "type": "transactionCreated",
    "txID": "1a04e4c7-362b-47d1-8f67-61ed7f0b8c00"
}
```

### Then Brodcast the transaction

Endpoint `/wallet/brodcast/{network}`
Method `POST`
Authentication `Bearer jwttoken`

Params : network -> eth (deafult)

##### Request Body :

```
{
    "txID" : "07d0108e-2d11-4dd2-9422-0eacf370ae1d"
}
```

##### Response :

```
{
    "success": true,
    "message": "Transaction Successfull",
    "data": {
        "receipt": {
            "transactionHash": "0x7dd32e86e0231c75a35e386bf36755bc66cc21ea2d2538f2fc510add3297ee2f",
            "transactionIndex": 0,
            "blockHash": "0xfc5a1646bb1dab9c11be752ebe148c9c78432933050a7b04c981445bdfd33639",
            "blockNumber": 1055,
            "from": "0x54580dde69c1a1cbdec951b3b816efddb187834f",
            "to": "0xfb4428cf772c560b7c66b254ad6beb7cf4abfea4",
            "gasUsed": 21000,
            "cumulativeGasUsed": 21000,
            "contractAddress": null,
            "logs": [],
            "status": true,
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        }
    }
}
```

###### Failed Response

If you brodcast unserialize transaction

```
{
    "success": false,
    "message": "Transaction Failed",
    "data": "Returned error: the tx doesn't have the correct nonce. account has nonce of: 1 tx has nonce of: 0"
}
```

If you don't have enough Funds

```
{
    "success": false,
    "message": "Transaction Failed",
    "data": "Returned error: sender doesn't have enough funds to send tx. The upfront cost is: 5001050000000000000 and the sender's account only has: 998850000000000000"
}

```

##### Profile API

Endpoint `/profile`
Method `GET`
Authentication `Bearer jwttoken`

##### show All User by Admin

Endpoint `/users`
Method `GET`
Authentication `Bearer jwttoken`

##### Get specific user By Admin

Endpoint `/user/{email}`
Method `GET`
Authentication `Bearer jwttoken`

##### Update user details by Admin

Endpoint `/user/{email}`
Method `PUT`
Authentication `Bearer jwttoken`

```
{
    "nickname" : "username",
    "email" : "email@email.com"
}

```

##### Delete user details by Admin

Endpoint `/user/{email}`
Method `DELETE`
Authentication `Bearer jwttoken`
