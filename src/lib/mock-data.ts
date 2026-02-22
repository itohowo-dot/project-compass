export type StreamStatus = "active" | "completed" | "cancelled";
export type StreamDirection = "outgoing" | "incoming";

export interface Stream {
  id: string;
  sender: string;
  recipient: string;
  totalAmount: number;
  vestedAmount: number;
  withdrawnAmount: number;
  direction: StreamDirection;
  status: StreamStatus;
  startBlock: number;
  endBlock: number;
  currentBlock: number;
  createdAt: string;
  durationDays: number;
}

export interface Transaction {
  id: string;
  streamId: string;
  type: "created" | "withdrawn" | "cancelled";
  amount: number;
  txHash: string;
  timestamp: string;
  blockHeight: number;
}

const USER_ADDRESS = "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQYAC0D";

export const mockStreams: Stream[] = [
  {
    id: "1",
    sender: USER_ADDRESS,
    recipient: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    totalAmount: 0.5,
    vestedAmount: 0.18,
    withdrawnAmount: 0.1,
    direction: "outgoing",
    status: "active",
    startBlock: 150000,
    endBlock: 154320,
    currentBlock: 151555,
    createdAt: "2026-02-10T14:30:00Z",
    durationDays: 30,
  },
  {
    id: "2",
    sender: "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE",
    recipient: USER_ADDRESS,
    totalAmount: 1.2,
    vestedAmount: 0.85,
    withdrawnAmount: 0.6,
    direction: "incoming",
    status: "active",
    startBlock: 148000,
    endBlock: 156640,
    currentBlock: 153200,
    createdAt: "2026-01-25T09:15:00Z",
    durationDays: 60,
  },
  {
    id: "3",
    sender: USER_ADDRESS,
    recipient: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
    totalAmount: 0.25,
    vestedAmount: 0.09,
    withdrawnAmount: 0.0,
    direction: "outgoing",
    status: "active",
    startBlock: 151000,
    endBlock: 153016,
    currentBlock: 151725,
    createdAt: "2026-02-15T18:00:00Z",
    durationDays: 14,
  },
  {
    id: "4",
    sender: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KR9D",
    recipient: USER_ADDRESS,
    totalAmount: 0.1,
    vestedAmount: 0.1,
    withdrawnAmount: 0.1,
    direction: "incoming",
    status: "completed",
    startBlock: 140000,
    endBlock: 141008,
    currentBlock: 151555,
    createdAt: "2025-12-01T12:00:00Z",
    durationDays: 7,
  },
  {
    id: "5",
    sender: USER_ADDRESS,
    recipient: "SP1P72Z3704VMT3DMHPP2CB8TGQWGDBHD3RPR9GZS",
    totalAmount: 2.0,
    vestedAmount: 0.4,
    withdrawnAmount: 0.0,
    direction: "outgoing",
    status: "cancelled",
    startBlock: 145000,
    endBlock: 158024,
    currentBlock: 146200,
    createdAt: "2025-12-20T08:45:00Z",
    durationDays: 90,
  },
];

export const mockTransactions: Transaction[] = [
  { id: "t1", streamId: "1", type: "created", amount: 0.5, txHash: "0xabc123def456789012345678901234567890abcd", timestamp: "2026-02-10T14:30:00Z", blockHeight: 150000 },
  { id: "t2", streamId: "1", type: "withdrawn", amount: 0.1, txHash: "0xdef456789012345678901234567890abcdef1234", timestamp: "2026-02-16T10:00:00Z", blockHeight: 150865 },
  { id: "t3", streamId: "2", type: "created", amount: 1.2, txHash: "0x789012345678901234567890abcdef1234567890", timestamp: "2026-01-25T09:15:00Z", blockHeight: 148000 },
  { id: "t4", streamId: "2", type: "withdrawn", amount: 0.3, txHash: "0x345678901234567890abcdef123456789012abcd", timestamp: "2026-02-05T15:20:00Z", blockHeight: 149600 },
  { id: "t5", streamId: "2", type: "withdrawn", amount: 0.3, txHash: "0x901234567890abcdef12345678901234abcdef56", timestamp: "2026-02-18T11:30:00Z", blockHeight: 152400 },
  { id: "t6", streamId: "4", type: "created", amount: 0.1, txHash: "0xabcdef1234567890abcdef1234567890abcdef12", timestamp: "2025-12-01T12:00:00Z", blockHeight: 140000 },
  { id: "t7", streamId: "4", type: "withdrawn", amount: 0.1, txHash: "0x567890abcdef1234567890abcdef123456789012", timestamp: "2025-12-08T14:00:00Z", blockHeight: 141008 },
  { id: "t8", streamId: "5", type: "created", amount: 2.0, txHash: "0xcdef1234567890abcdef1234567890abcdef1234", timestamp: "2025-12-20T08:45:00Z", blockHeight: 145000 },
  { id: "t9", streamId: "5", type: "cancelled", amount: 1.6, txHash: "0x1234567890abcdef1234567890abcdef12345678", timestamp: "2026-01-05T16:30:00Z", blockHeight: 146200 },
];

export function getProgress(stream: Stream): number {
  if (stream.status === "completed") return 100;
  if (stream.status === "cancelled") {
    const total = stream.endBlock - stream.startBlock;
    const elapsed = stream.currentBlock - stream.startBlock;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }
  const total = stream.endBlock - stream.startBlock;
  const elapsed = stream.currentBlock - stream.startBlock;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function getTimeLeft(stream: Stream): string {
  if (stream.status === "completed") return "Completed";
  if (stream.status === "cancelled") return "Cancelled";
  const blocksLeft = stream.endBlock - stream.currentBlock;
  if (blocksLeft <= 0) return "Completed";
  // ~10 min per block on Stacks
  const minutesLeft = blocksLeft * 10;
  const days = Math.floor(minutesLeft / 1440);
  const hours = Math.floor((minutesLeft % 1440) / 60);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h left`;
  return `${minutesLeft}m left`;
}

export function getWithdrawable(stream: Stream): number {
  return Math.max(0, stream.vestedAmount - stream.withdrawnAmount);
}

export function getRemaining(stream: Stream): number {
  return Math.max(0, stream.totalAmount - stream.vestedAmount);
}

export function getDailyRate(stream: Stream): number {
  if (stream.durationDays === 0) return 0;
  return stream.totalAmount / stream.durationDays;
}

export function formatAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getStreamById(id: string): Stream | undefined {
  return mockStreams.find((s) => s.id === id);
}

export function getTransactionsForStream(streamId: string): Transaction[] {
  return mockTransactions.filter((t) => t.streamId === streamId);
}
