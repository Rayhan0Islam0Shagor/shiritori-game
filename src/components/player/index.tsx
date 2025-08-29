import { forwardRef, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import type { TWord } from '@/hooks/useGame';
import { cn } from '@/lib/utils';

interface PlayGroundProps {
  label: string;
  score?: number;
  disabled?: boolean;
  onSubmit?: (word: string) => void;
  playerData: TWord[];
  error: string | null;
  lastLetter: string;
}

const PlayGround = forwardRef<HTMLInputElement, PlayGroundProps>(
  ({ label, disabled, onSubmit, error, lastLetter, playerData }, ref) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const word = formData.get('word') as string;
      onSubmit?.(word);
      e.currentTarget.reset();
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
              name="word"
              placeholder={lastLetter || label}
              className={cn('text-xl', {
                'cursor-not-allowed': disabled,
                'border-red-500': error,
              })}
              type="text"
              ref={ref}
              disabled={disabled}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
          <li className="flex items-center justify-between pb-4 border-b-4 border-gray-400 mb-4">
            <p>Word</p>
            <p className="text-sm">Duration</p>
          </li>
          <ScrollArea className="h-[500px] w-full border-b">
            <ul className="">
              {playerData?.map(({ word, time }, index) => (
                <li
                  className="flex items-center justify-between py-2 border-b border-gray-400"
                  key={index}
                >
                  <div>
                    <p>{word}</p>
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
