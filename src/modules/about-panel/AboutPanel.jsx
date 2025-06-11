export default function AboutPanel (props) {
   return (
    <div className="about-panel-background" onClick={props.onClose}>
        <div className="about-panel" onClick={(e) => e.stopPropagation()}>
            <div className="info-panel-title">Acerca de</div>
            <div className="info-panel-content">
                Proyecto realizado por Diego Gil Luengo.<br/><br/>
                Estudiante de la Universidad Rey Juan Carlos en el grado de Ingeniería de Computadores.
            </div>
        </div>
    </div>
)};