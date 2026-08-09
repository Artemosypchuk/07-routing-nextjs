import css from "./Layout.module.css";
interface SidebarProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}
export default function SidebarNotesLayout({
  children,
  sidebar,
  modal,
}: SidebarProps) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
