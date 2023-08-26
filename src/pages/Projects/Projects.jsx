import { Button, Input, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import s from "./Projects.module.css";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineCheck } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { BiStopCircle } from "react-icons/bi";
import TextArea from "antd/es/input/TextArea";

function Projects() {
  const [addProject, setAddProject] = useState(false);
  const handleAddProject = () => {
    setAddProject(!addProject);
  };

  return (
    <main>
      <section className={s.projects_info}>
        <div>
          <GrInProgress size={24} />
          <h3>Проектов в разработке -</h3>
          <span>3</span>
        </div>
        <div>
          <AiOutlineCheck size={24} />
          <h3>Завершенные проекты -</h3>
          <span>1</span>
        </div>
        <div>
          <BsClockHistory size={24} />
          <h3>Скоро в разработке -</h3>
          <span>5</span>
        </div>
        <div>
          <GiMoneyStack size={34} />
          <h3>Заработанно с проектов -</h3>
          <span>300 000 руб</span>
        </div>
        <div>
          <GiTakeMyMoney size={34} />
          <h3>Бюджет в разработке -</h3>
          <span>100 000 руб</span>
        </div>
        <div>
          <BiStopCircle size={27} />
          <h3>Проекты на холде -</h3>
          <span>1</span>
        </div>
      </section>
      <div>
        <Button onClick={handleAddProject} type="primary">
          Добавить проект
        </Button>
      </div>
      {addProject ? (
        <section>
          <form className={s.project_create_form} action="">
            <Input type="text" placeholder="Название проекта" />
            <Input type="number" placeholder="Выделенный бюджет" />
            <Input type="text" placeholder="Дедлайн" />
            <TextArea
              showCount
              maxLength={1000}
              placeholder="Описание проекта"
            />
            <Input type="text" placeholder="Контактные данные клиента" />
          </form>
        </section>
      ) : null}
      <section className={s.projects_table}>
        <Table columns={columns} dataSource={data} />
      </section>
    </main>
  );
}

export default Projects;

const columns = [
  {
    title: "Название проекта",
    dataIndex: "project_title",
    key: "project_title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Выделенный бюджет",
    dataIndex: "project_budget",
    key: "project_budget",
  },
  {
    title: "Дедлайн",
    dataIndex: "project_deadline",
    key: "project_deadline",
  },
  {
    title: "Статус",
    key: "project_status",
    dataIndex: "project_status",
    render: (_, { project_status }) => (
      <>
        {project_status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Подробнее {record.name}</a>
        <a>Удалить</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    project_title: "Dev Squad CRM Sistem",
    project_budget: "100 000 руб",
    project_deadline: "Осталось - 7 дней",
    project_status: ["in progress"],
  },
];
