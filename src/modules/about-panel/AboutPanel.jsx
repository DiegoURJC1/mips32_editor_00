export default function AboutPanel (props) {
   return (
    <div className="about-panel-background" onClick={props.onClose}>
        <div className="about-panel" onClick={(e) => e.stopPropagation()}>
            <div className="info-panel-title">Acerca de</div>
            <div className="info-panel-content">
                Proyecto realizado por Diego Gil Luengo en el curso académico 2024-2025.<br/><br/>
                Estudiante de la Universidad Rey Juan Carlos en el grado de Ingeniería de Computadores.<br/><br/>
                <a href={"https://github.com/DiegoURJC1/mips32_editor_00"}>Github</a> del proyecto.<br/><br/>
                Este proyecto está bajo licencia CC BY-NC
            </div>
        </div>
    </div>
)};