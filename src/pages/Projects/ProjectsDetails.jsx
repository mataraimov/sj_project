import React from "react";
import s from "./Projects.module.css";

function ProjectsDetails() {
  return (
    <main className={s.details_container}>
      <section className={s.details_info}>
        <div className={s.project_details}>
          <h2>Dev Squad CRM Sistem</h2>
          <p>
            СРМ сиситема для IT компании "Dev Squad". На платформе идет полный
            контроль, учет расходов и доходов и данных
          </p>
        </div>
      </section>
    </main>
  );
}

export default ProjectsDetails;
