import React, { useState } from 'react';

// A simple toggle switch component for reusability
const ToggleSwitch = ({ id, label, enabled, setEnabled }: { id: string; label: string; enabled: boolean; setEnabled: (enabled: boolean) => void; }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-gray-700">
      {label}
    </label>
    <button
      id={id}
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </button>
  </div>
);

const SettingsPage: React.FC = () => {
    // State for user profile
    const [name, setName] = useState('Usuario Actual');
    const [email, setEmail] = useState('usuario@email.com');

    // State for notifications
    const [newCoursesEnabled, setNewCoursesEnabled] = useState(true);
    const [remindersEnabled, setRemindersEnabled] = useState(true);
    const [meetingsEnabled, setMeetingsEnabled] = useState(false);
    
    // State for appearance
    const [theme, setTheme] = useState('Claro');

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">Configuración</h1>
                <p className="text-lg text-gray-600 mt-2">Gestiona tu cuenta, preferencias y notificaciones.</p>
            </div>

            {/* Profile Information Section */}
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Información de Perfil</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="text-right">
                         <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </section>
            
             {/* Security Section */}
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Seguridad</h2>
                 <form className="space-y-4">
                    <div>
                        <label htmlFor="current-password"  className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                        <input type="password" id="current-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="new-password"  className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                        <input type="password" id="new-password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div className="text-right">
                         <button type="submit" className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Cambiar Contraseña
                        </button>
                    </div>
                </form>
            </section>

            {/* Notifications Section */}
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Notificaciones</h2>
                <div className="space-y-4">
                    <ToggleSwitch id="new-courses" label="Nuevos cursos y eventos" enabled={newCoursesEnabled} setEnabled={setNewCoursesEnabled} />
                    <ToggleSwitch id="reminders" label="Recordatorios de estudio" enabled={remindersEnabled} setEnabled={setRemindersEnabled} />
                    <ToggleSwitch id="meetings" label="Actividad de Meetings" enabled={meetingsEnabled} setEnabled={setMeetingsEnabled} />
                </div>
            </section>
            
            {/* Appearance Section */}
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Apariencia</h2>
                <div className="flex items-center space-x-4">
                    {['Claro', 'Oscuro', 'Sistema'].map((themeOption) => (
                        <button
                            key={themeOption}
                            onClick={() => setTheme(themeOption)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                                theme === themeOption 
                                ? 'bg-blue-600 text-white shadow' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {themeOption}
                        </button>
                    ))}
                </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-200">
                <h2 className="text-2xl font-bold text-red-700 mb-2">Zona de Peligro</h2>
                <p className="text-gray-600 mb-4">Estas acciones son permanentes y no se pueden deshacer. Procede con precaución.</p>
                <button className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Eliminar mi cuenta
                </button>
            </section>
        </div>
    );
};

export default SettingsPage;