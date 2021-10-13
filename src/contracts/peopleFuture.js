export const peopleFutureAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
    ],
    name: "EscrowCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountReleased",
        type: "uint256",
      },
    ],
    name: "EscrowReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "prompti",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FeePaymentMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "prospect",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InitialPaymentMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
    ],
    name: "ProspectPaidSponsor",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "earnings",
        type: "uint256",
      },
    ],
    name: "ProspectReportedEarnings",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "escrowId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "earnings",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sponsorPayout",
        type: "uint256",
      },
    ],
    name: "SponsorVerifiedEarnings",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "earningReports",
    outputs: [
      {
        internalType: "uint256",
        name: "mostRecentEarningsReportYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mostRecentEarningsReportReceivedYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfEarningsReports",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "earnings",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cumulativePayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cumulativeExcessPayout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "excessProfitsEscrowReleaseRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "escrowAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "paymentMade",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "escrows",
    outputs: [
      {
        internalType: "address payable",
        name: "sponsor",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "prospect",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "prompti",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "totalPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "escrowPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "feePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numberOfYears",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "firstYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "paymentBrackets",
    outputs: [
      {
        internalType: "uint256",
        name: "tierOnePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tierTwoPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tierThreePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tierTwoMinimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tierThreeMinimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minimumPayout",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_sponsor",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_prospect",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_prompti",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalPayment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_escrowPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfYears",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_firstYear",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_projectedEarnings",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_baseEscrowbalances",
        type: "uint256[]",
      },
    ],
    name: "initializeNewContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tierOnePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tierTwoPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tierThreePercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tierTwoMinimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tierThreeMinimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumPayout",
        type: "uint256",
      },
    ],
    name: "initializeValues",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "initialPayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_earnings",
        type: "uint256",
      },
    ],
    name: "reportEarnings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_earnings",
        type: "uint256",
      },
    ],
    name: "verifyEarningsReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "payPortionOfEarnings",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getTotalPayment",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getEscrowPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getProjectedEarnings",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getSponsor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getBaseEscrow",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getProjectedPayout",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contractId",
        type: "uint256",
      },
    ],
    name: "getEscrowBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
