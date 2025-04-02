import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchSkillsRequest } from "../store/skillsSlice";
import { useCallback } from "react";

export default function Skills() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.skills
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(fetchSkillsRequest(e.target.value));
    },
    [dispatch]
  );

  return (
    <main>
      <div>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Введите запрос"
        />
      </div>

      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}

      <ul>
        {items.length === 0 ? (
          <li>Type something to search...</li>
        ) : (
          items.map((item) => <li key={item.id}>{item.name}</li>)
        )}
      </ul>
    </main>
  );
}
