import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../store/trainerSlice";
import { RootState, AppDispatch } from "../store/store";

const TrainerList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainers, loading, error } = useSelector(
    (state: RootState) => state.trainers
  );

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Table</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {trainers.map((trainer) => (
          <li key={trainer.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  {trainer.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {trainer.email}
                </p>
                <p className="mt-1 text-xs text-gray-500">{trainer.bio}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm text-gray-900">
                Experience: {trainer.experience_years} years
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrainerList;
