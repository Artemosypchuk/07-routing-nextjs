import Link from "next/link";
import css from "./SidebarNotes.module.css";
export default function SidebarNotes() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <>
      <ul className={css.menuList}>
        {/* 1. Статичний елемент для всіх нотаток */}
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>

        {/* 2. Динамічні елементи за допомогою map */}
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
