import * as vscode from 'vscode';
import Web3 from 'web3';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.deployContract', async () => {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    const bytecode = '...'; // Replace with your contract's bytecode
    const abi = [/* ... */]; // Replace with your contract's ABI

    const contract = new web3.eth.Contract(abi);
    contract.deploy({ data: bytecode })
      .send({ from: accounts[0], gas: "1500000", gasPrice: '30000000000000' })
      .then((newContractInstance) => {
        vscode.window.showInformationMessage('Contract deployed at ' + newContractInstance.options.address);
      })
      .catch((error) => {
        vscode.window.showErrorMessage('Error deploying contract: ' + error.message);
      });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
