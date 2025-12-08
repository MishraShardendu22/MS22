const page = () => {
  const colors = [
    // Core Dark Base
    { name: 'Background', value: '#0a0d11', css: 'bg-background' },
    { name: 'Foreground', value: '#e5eaf0', css: 'bg-foreground' },
    { name: 'Surface', value: '#0f141a', css: 'bg-surface' },
    { name: 'Surface Elevated', value: '#141b24', css: 'bg-surface-elevated' },
    { name: 'Border', value: '#1e2630', css: 'bg-border' },
    
    // Text Colors
    { name: 'Text Primary', value: '#e5eaf0', css: 'bg-text-primary' },
    { name: 'Text Secondary', value: '#9aa4af', css: 'bg-text-secondary' },
    { name: 'Text Disabled', value: '#6b7280', css: 'bg-text-disabled' },
    
    // BMW Blue
    { name: 'Blue Primary', value: '#0e1b2b', css: 'bg-blue-primary' },
    { name: 'Blue Hover', value: '#142a44', css: 'bg-blue-hover' },
    { name: 'Blue Active', value: '#1b3f6b', css: 'bg-blue-active' },
    
    // Yellow-Green Accent
    { name: 'Lime Primary', value: '#aeea00', css: 'bg-lime-primary' },
    { name: 'Lime Hover', value: '#c4ff1a', css: 'bg-lime-hover' },
    { name: 'Lime Dark', value: '#445a00', css: 'bg-lime-dark' },
    
    // M Red
    { name: 'Red Accent', value: '#c1121f', css: 'bg-red-accent' },
    
    // Status
    { name: 'Success', value: '#1ec98b', css: 'bg-success' },
    { name: 'Warning', value: '#eab308', css: 'bg-warning' },
    { name: 'Error', value: '#dc2626', css: 'bg-error' },
    { name: 'Info', value: '#38bdf8', css: 'bg-info' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            M Sport Dark Theme
          </h1>
          <p className="text-text-secondary text-lg">
            Complete Color Palette Overview
          </p>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color) => (
            <div key={color.value} className="group cursor-pointer">
              <div
                className="h-32 rounded-lg border border-border shadow-lg transition-transform hover:scale-105 mb-3"
                style={{ backgroundColor: color.value }}
                title={color.value}
              />
              <h3 className="text-foreground font-semibold text-sm mb-1">
                {color.name}
              </h3>
              <p className="text-text-secondary text-xs font-mono">
                {color.value}
              </p>
              <p className="text-text-disabled text-xs mt-1">
                {color.css}
              </p>
            </div>
          ))}
        </div>

        {/* Color Groups Section */}
        <div className="mt-16 space-y-12">
          {/* Core Colors */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Core Dark Base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {colors.slice(0, 5).map((color) => (
                <div
                  key={color.value}
                  className="bg-surface-elevated rounded-lg p-4 border border-border"
                >
                  <div
                    className="h-24 rounded mb-3"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-foreground font-semibold text-sm">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Text Colors */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Text Colors
            </h2>
            <div className="space-y-4">
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#e5eaf0', color: '#0a0d11' }}
              >
                <p className="font-semibold">Text Primary (#e5eaf0)</p>
                <p className="text-sm opacity-80">
                  Main text color - use for headers and important content
                </p>
              </div>
              <div
                className="p-6 rounded-lg bg-surface-elevated"
                style={{ color: '#9aa4af' }}
              >
                <p className="font-semibold">Text Secondary (#9aa4af)</p>
                <p className="text-sm opacity-80">
                  Supporting text - use for descriptions and secondary info
                </p>
              </div>
              <div
                className="p-6 rounded-lg bg-surface-elevated"
                style={{ color: '#6b7280' }}
              >
                <p className="font-semibold">Text Disabled (#6b7280)</p>
                <p className="text-sm opacity-80">
                  Disabled state text - use for inactive elements
                </p>
              </div>
            </div>
          </section>

          {/* BMW Blue States */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              BMW Blue States
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                className="p-6 rounded-lg font-semibold text-white border-2"
                style={{ backgroundColor: '#0e1b2b', borderColor: '#0e1b2b' }}
              >
                Primary (#0e1b2b)
              </button>
              <button
                className="p-6 rounded-lg font-semibold text-white border-2"
                style={{ backgroundColor: '#142a44', borderColor: '#142a44' }}
              >
                Hover (#142a44)
              </button>
              <button
                className="p-6 rounded-lg font-semibold text-white border-2"
                style={{ backgroundColor: '#1b3f6b', borderColor: '#1b3f6b' }}
              >
                Active (#1b3f6b)
              </button>
            </div>
          </section>

          {/* Lime Accent States */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Lime Accent States
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                className="p-6 rounded-lg font-semibold border-2"
                style={{
                  backgroundColor: '#aeea00',
                  color: '#0a0d11',
                  borderColor: '#aeea00',
                }}
              >
                Primary (#aeea00)
              </button>
              <button
                className="p-6 rounded-lg font-semibold border-2"
                style={{
                  backgroundColor: '#c4ff1a',
                  color: '#0a0d11',
                  borderColor: '#c4ff1a',
                }}
              >
                Hover (#c4ff1a)
              </button>
              <button
                className="p-6 rounded-lg font-semibold text-white border-2"
                style={{
                  backgroundColor: '#445a00',
                  borderColor: '#445a00',
                }}
              >
                Dark (#445a00)
              </button>
            </div>
          </section>

          {/* Status Colors */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Status Colors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div
                className="p-6 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#1ec98b' }}
              >
                Success
              </div>
              <div
                className="p-6 rounded-lg font-semibold"
                style={{ backgroundColor: '#eab308', color: '#0a0d11' }}
              >
                Warning
              </div>
              <div
                className="p-6 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#dc2626' }}
              >
                Error
              </div>
              <div
                className="p-6 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#38bdf8' }}
              >
                Info
              </div>
            </div>
          </section>

          {/* Minimal M Red */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              M Red Accent
            </h2>
            <div
              className="p-12 rounded-lg text-white font-semibold text-center text-xl"
              style={{ backgroundColor: '#c1121f' }}
            >
              Minimal M Red (#c1121f)
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-text-secondary text-sm">
          <p>
            This palette demonstrates the M Sport Dark Theme color system
            designed for modern UI with BMW styling inspiration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
