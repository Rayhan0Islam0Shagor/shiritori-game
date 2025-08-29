import { forwardRef, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';

interface PlayGroundProps {
  label: string;
  score?: number;
  disabled?: boolean;
  onSubmit?: () => void;
}

const PlayGround = forwardRef<HTMLInputElement, PlayGroundProps>(
  ({ label, disabled, onSubmit }, ref) => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSubmit?.(); // tell parent to switch turn
    };

    return (
      <Card className="relative">
        <CardHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <Label>{label}</Label>
              <p className="text-sm">Score</p>
            </div>
            <Input
              placeholder="Player 1"
              className="text-xl"
              type="text"
              ref={ref}
              disabled={disabled}
            />
            <div className="flex items-center justify-between">
              <Button
                className="mt-2 w-fit cursor-pointer"
                type="submit"
                disabled={disabled}
              >
                Next
              </Button>

              <p>Count down</p>
            </div>
          </form>
        </CardHeader>

        <CardContent>
          <li className="flex items-center justify-between pb-4 border-b border-gray-400 mb-4">
            <p>Word</p>
            <p className="text-sm">Duration</p>
          </li>
          <ScrollArea className="h-[500px] w-full border-b">
            <ul className="">
              {Array.from({ length: 100 }).map((_, index) => (
                <li
                  className="flex items-center justify-between py-2 border-b border-gray-400"
                  key={index}
                >
                  <div>
                    <p>word {index}</p>
                  </div>

                  <p className="text-sm">2s</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  },
);

PlayGround.displayName = 'PlayGround';

export default PlayGround;
