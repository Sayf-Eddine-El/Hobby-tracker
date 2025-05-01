import Cards from "./Cards";

export default function UserStats() {
  const stats = ["Time spend this week", "Your goals", "Your hobbies"];
  return (
    <section className="flex flex-row gap-10 ">
      {stats.map((e, i) => (
        <Cards key={i} name={e} />
      ))}
    </section>
  );
}
