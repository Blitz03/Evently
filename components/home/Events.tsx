import CategoryFilter from "../shared/CategoryFilter";
import Search from "../shared/Search";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Events() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  return (
    <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">
        Trust by <br /> Thousands of Events
      </h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Search />
        <CategoryFilter />
      </div>

      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back later"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={2}
      />
    </section>
  );
}
