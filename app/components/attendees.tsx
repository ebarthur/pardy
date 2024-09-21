interface Props {
  isOrganizer?: boolean;
}

export default function Attendees({ isOrganizer }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {isOrganizer ? (
        <div>
          <h4 className="flex flex-col items-center font-mono text-lg">
            Attendees:
          </h4>
          <h2 className="my-8 text-center text-7xl font-semibold">0</h2>
        </div>
      ) : (
        <div>
          <h4 className="flex flex-col items-center font-mono text-lg">
            My Events:
          </h4>
          <h2 className="my-8 text-center text-7xl font-semibold">0</h2>
        </div>
      )}
    </div>
  );
}
