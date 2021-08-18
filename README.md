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
