import compiled from "../contracts/Medical.json";

const abi = compiled.abi;
const bytecode = compiled.bytecode;

export const deploy = async function () {
  const web3 = window.web3;
  const accountsAvailable = await web3.eth.getAccounts();
  const instance = new web3.eth.Contract(abi);

  return instance
    .deploy({
      data: bytecode,
    })
    .send({
      from: accountsAvailable[0],
    })
    .then((deployment) => {
      console.log(
        "Contract was deployed at the following address:",
        deployment.options.address
      );
      return deployment.options.address;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const askReadPermission = async (account, address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    return contract.methods
      .ReadPermission()
      .send({ from: account })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const askWritePermission = async (account, address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    let res;
    await contract.methods
      .WritePermission()
      .send({ from: account })
      .then((response) => {
        console.log(response);
        res = response;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const handleRead = async (account, address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    await contract.methods
      .Read()
      .send({ from: account })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const handleWrite = async (account, address, locationHash) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    await contract.methods
      .Write(locationHash)
      .send({ from: account })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const grantReadPermission = async (account, address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    await contract.methods
      .GrantReadPermission()
      .send({ from: account })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const grantWritePermission = async (account, address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    await contract.methods
      .GrantWritePermission()
      .send({ from: account })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const checkReader = async (address) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    return await contract.canRead
      .call(address)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const checkWriter = async (address, writerAddress) => {
  try {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(abi, address);
    return await contract.methods
      .CheckWritePermission()
      .call({ from: writerAddress })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
