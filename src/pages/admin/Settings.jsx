import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, Shield, Check, Info, Phone, Mail, MapPin, Share2, Globe, Palette } from 'lucide-react';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const SettingsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  // Local state for settings grouped logically
  const [settings, setSettings] = useState({
    // Contact Info
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    whatsapp_number: '',

    // Social Media
    social_facebook: '',
    social_linkedin: '',
    social_instagram: '',

    // General
    site_tagline: '',
    site_description: '',

    // Design & Content Settings
    site_logo: '',
    site_favicon: '',
    hero_badge: '',
    hero_subtitle: '',
    about_presentation_title: '',
    about_presentation_text1: '',
    about_presentation_text2: '',
    about_image: '',
    hero_image: '',
    home_about_image: '',
    why_choose_us_items: ''
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;

      if (data && data.length > 0) {
        // Map rows to key-value state
        const mappedSettings = { ...settings };
        data.forEach(item => {
          if (item.key in mappedSettings) {
            mappedSettings[item.key] = item.value || '';
          }
        });
        setSettings(mappedSettings);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccess(false);

      // Perform upserts for all settings key-values
      const upsertPromises = Object.entries(settings).map(async ([key, value]) => {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ key, value, updated_at: new Date() }, { onConflict: 'key' });
        
        if (error) throw error;
      });

      await Promise.all(upsertPromises);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Une erreur est survenue lors de l\'enregistrement des paramètres.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'contact', name: 'Coordonnées', icon: Phone },
    { id: 'socials', name: 'Réseaux Sociaux', icon: Share2 },
    { id: 'general', name: 'Informations Générales', icon: Globe },
    { id: 'design', name: 'Design & Contenu', icon: Palette }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres du Site</h1>
          <p className="text-sm text-gray-500">Configurez les coordonnées, les logos, les images et les textes de l'agence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="md:col-span-1 bg-white p-3 rounded-2xl border border-gray-100 h-fit space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Settings Form */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <form onSubmit={handleSave} className="flex flex-col h-full justify-between">
            {/* Form Fields Area */}
            <div className="p-6 space-y-6">
              
              {activeTab === 'contact' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-primary pb-2 border-b border-gray-50">
                    <Phone size={18} className="font-bold" />
                    <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">Coordonnées de l'Agence</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Adresse Email de Contact</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="email"
                          name="contact_email"
                          value={settings.contact_email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="contact@expertdigital.sn"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Téléphone Fixe / Portable</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="contact_phone"
                          value={settings.contact_phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="+221 77 000 00 00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Numéro WhatsApp (SANS le "+")</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" size={16} />
                        <input
                          type="text"
                          name="whatsapp_number"
                          value={settings.whatsapp_number}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="221770000000"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">Utilisé pour lier directement le bouton WhatsApp flottant.</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Adresse Physique</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          name="contact_address"
                          value={settings.contact_address}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Mermoz, Dakar, Sénégal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'socials' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-primary pb-2 border-b border-gray-50">
                    <Share2 size={18} className="font-bold" />
                    <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">Réseaux Sociaux</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Page Facebook (URL)</label>
                      <input
                        type="text"
                        name="social_facebook"
                        value={settings.social_facebook}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://facebook.com/expertdigital"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Page LinkedIn (URL)</label>
                      <input
                        type="text"
                        name="social_linkedin"
                        value={settings.social_linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://linkedin.com/company/expertdigital"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Compte Instagram (URL)</label>
                      <input
                        type="text"
                        name="social_instagram"
                        value={settings.social_instagram}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="https://instagram.com/expertdigital"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'general' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-primary pb-2 border-b border-gray-50">
                    <Globe size={18} className="font-bold" />
                    <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">Métadonnées et Slogans</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Slogan principal du site</label>
                      <input
                        type="text"
                        name="site_tagline"
                        value={settings.site_tagline}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Ex: Je propulse vos marques vers le succès digital"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase">Description SEO de l'Agence (Meta Description)</label>
                      <textarea
                        name="site_description"
                        rows="4"
                        value={settings.site_description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Une description engageante de l'agence pour Google..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-primary pb-2 border-b border-gray-50">
                    <Palette size={18} className="font-bold" />
                    <h3 className="font-bold text-sm text-gray-800 uppercase tracking-wider">Design & Contenus Textuels</h3>
                  </div>

                  {/* Section: Logos & Favicon */}
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
                    <h4 className="font-bold text-xs text-primary uppercase tracking-wide">1. Identité Visuelle (Images)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <ImageUploader 
                          label="Logo Principal"
                          helpText="Affiché dans le header, footer, et la sidebar admin."
                          value={settings.site_logo}
                          onChange={(val) => setSettings(p => ({ ...p, site_logo: val }))}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <ImageUploader 
                          label="Favicon (Onglet)"
                          helpText="Icône affichée dans l'onglet du navigateur (Idéalement carré)."
                          value={settings.site_favicon}
                          onChange={(val) => setSettings(p => ({ ...p, site_favicon: val }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Hero */}
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
                    <h4 className="font-bold text-xs text-primary uppercase tracking-wide">2. Contenu Section Hero (Accueil)</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Texte du Badge Hero</label>
                        <input
                          type="text"
                          name="hero_badge"
                          value={settings.hero_badge}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ex: Agence digitale N°1 à Ziguinchor"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Sous-titre explicatif Hero</label>
                        <textarea
                          name="hero_subtitle"
                          rows="2"
                          value={settings.hero_subtitle}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ex: Création de sites web ultra-performants et gestion stratégique..."
                        />
                      </div>
                      
                      <div className="space-y-1 pt-2">
                        <ImageUploader 
                          label="Image Dashboard (Hero)"
                          helpText="L'image illustrant le succès digital dans la section haute de l'accueil."
                          value={settings.hero_image}
                          onChange={(val) => setSettings(p => ({ ...p, hero_image: val }))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: About Page */}
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-4">
                    <h4 className="font-bold text-xs text-primary uppercase tracking-wide">3. Contenu de la Page À Propos</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 uppercase">Titre de présentation</label>
                          <input
                            type="text"
                            name="about_presentation_title"
                            value={settings.about_presentation_title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: Notre histoire & Notre Mission"
                          />
                        </div>
                        <div className="space-y-1">
                          <ImageUploader 
                            label="Image de Présentation (Page À Propos)"
                            helpText="Apparaît sur la page À Propos à côté du texte."
                            value={settings.about_image}
                            onChange={(val) => setSettings(p => ({ ...p, about_image: val }))}
                          />
                        </div>
                        <div className="space-y-1">
                          <ImageUploader 
                            label="Image Équipe (Page Accueil)"
                            helpText="Apparaît sur l'accueil dans la section À Propos."
                            value={settings.home_about_image}
                            onChange={(val) => setSettings(p => ({ ...p, home_about_image: val }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Paragraphe de présentation 1</label>
                        <textarea
                          name="about_presentation_text1"
                          rows="3"
                          value={settings.about_presentation_text1}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Saisissez le premier paragraphe de présentation..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Paragraphe de présentation 2</label>
                        <textarea
                          name="about_presentation_text2"
                          rows="3"
                          value={settings.about_presentation_text2}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Saisissez le deuxième paragraphe de présentation..."
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 uppercase">Éléments "Pourquoi nous choisir ?" (Un point par ligne)</label>
                        <textarea
                          name="why_choose_us_items"
                          rows="4"
                          value={settings.why_choose_us_items}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
                          placeholder="Ligne 1 : Équipe jeune et créative&#10;Ligne 2 : Expertise locale..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Form Actions Footer */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-500">
                <Shield size={14} />
                <span className="text-[10px] font-semibold uppercase">Modifications sécurisées</span>
              </div>
              
              <div className="flex items-center gap-3">
                {success && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <Check size={14} />
                    Sauvegardé avec succès
                  </span>
                )}
                
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/95 disabled:bg-gray-400 text-white font-semibold rounded-xl text-sm px-6 py-2.5 transition-all shadow-sm"
                >
                  <Save size={16} />
                  {saving ? 'Enregistrement...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};