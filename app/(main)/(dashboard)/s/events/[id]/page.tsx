type Props = {
  params: {
    id: string;
  };
};

export default function Event({ params }: Props) {
  return <div>Event {params.id}</div>;
}
