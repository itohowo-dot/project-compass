import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Stream, getWithdrawable, MOCK_BTC_USD } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface Props {
  stream: Stream;
}

export function StreamActions({ stream }: Props) {
  const { toast } = useToast();
  const withdrawable = getWithdrawable(stream);
  const isOutgoing = stream.direction === "outgoing";

  if (stream.status !== "active") return null;

  return (
    <div className="flex flex-col gap-3">
      {!isOutgoing && withdrawable > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full">Withdraw {withdrawable.toFixed(4)} sBTC (≈ ${(withdrawable * MOCK_BTC_USD).toLocaleString("en-US", { maximumFractionDigits: 0 })})</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
              <AlertDialogDescription>
                You will withdraw {withdrawable.toFixed(4)} sBTC (≈ ${(withdrawable * MOCK_BTC_USD).toLocaleString("en-US", { maximumFractionDigits: 0 })}) from this stream. This action will submit a transaction to the Stacks network.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast({ title: "Withdrawal Submitted", description: `${withdrawable.toFixed(4)} sBTC withdrawal is processing.` })}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isOutgoing && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">Cancel Stream</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Stream?</AlertDialogTitle>
              <AlertDialogDescription>
                Cancelling will return unvested funds to your wallet. Already vested funds remain claimable by the recipient.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Stream</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast({ title: "Stream Cancelled", description: "Unvested funds have been returned." })}>
                Cancel Stream
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
