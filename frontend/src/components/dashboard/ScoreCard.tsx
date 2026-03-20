interface ScoreCardProps {
  name: string;
  score: number;
}

// card showing a developer's score
export default function ScoreCard({ name, score }: ScoreCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <span className="text-gray-200 font-medium">{name}</span>
      <span className="text-green-400 font-bold text-lg">
        {score}
        <span className="text-gray-500 text-sm font-normal"> / 1000</span>
      </span>
    </div>
  );
}
