# Grafisk facilitering i SVG. Håndtegnet stil, sort tusch på hvidt, gul marker som accent.
import html, math, random

INK = '#1f2937'
GUL = '#fde68a'
ORANGE = '#f2a25c'
FONT = "'PatrickHand','Segoe Print','Comic Sans MS',cursive"
import base64 as _b64, os as _os
PH_B64 = _b64.b64encode(open(_os.path.join(_os.path.dirname(__file__), 'patrickhand.ttf'), 'rb').read()).decode()

def head(seed=3):
    return f'''<style>@font-face{{font-family:'PatrickHand';src:url(data:font/ttf;base64,{PH_B64}) format('truetype');}}</style>
<defs>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="{seed}" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="5"/>
</filter>
<filter id="rough2" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="{seed+11}" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="3"/>
</filter>
</defs>'''

def T(x, y, s, size=20, w=700, anchor='start', rot=0):
    t = f'transform="rotate({rot} {x} {y})"' if rot else ''
    return f'<text x="{x}" y="{y}" font-family={FONT!r} font-size="{size}" font-weight="{w}" fill="{INK}" text-anchor="{anchor}" letter-spacing="0.5" {t}>{html.escape(s)}</text>'

def marker(x, y, w, h=26):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{GUL}" filter="url(#rough)" opacity="0.9"/>'

def stick(x, y, scale=1.0, pose='stand', seed=1, smile=True):
    s = scale
    g = []
    # blød skygge på jorden
    g.append(f'<ellipse cx="{x}" cy="{y+78*s:.0f}" rx="{30*s:.0f}" ry="{7*s:.0f}" fill="#e2e5ea"/>')
    tilt = 8 if pose == 'walk' else 0
    g.append(f'<g transform="rotate({tilt} {x} {y+40*s:.0f})">')
    # krop som blød klokke, hvid med sort streg
    ty = y + 18*s
    by = y + 58*s
    g.append(f'<path d="M {x-15*s:.0f} {by:.0f} C {x-17*s:.0f} {ty+8*s:.0f} {x-9*s:.0f} {ty:.0f} {x} {ty:.0f} C {x+9*s:.0f} {ty:.0f} {x+17*s:.0f} {ty+8*s:.0f} {x+15*s:.0f} {by:.0f} Z" fill="#fff" stroke="{INK}" stroke-width="2.6"/>')
    g.append(f'<path d="M {x+4*s:.0f} {ty+3*s:.0f} Q {x+15*s:.0f} {(ty+by)/2:.0f} {x+8*s:.0f} {by-2*s:.0f} Q {x+10*s:.0f} {(ty+by)/2:.0f} {x+4*s:.0f} {ty+3*s:.0f} Z" fill="#dfe3e8"/>')
    # arme som bløde buer fra skulderen
    sy = ty + 7*s
    if pose == 'point':
        g.append(f'<path d="M {x-9*s:.0f} {sy:.0f} C {x-20*s:.0f} {sy+12*s:.0f} {x-22*s:.0f} {sy+20*s:.0f} {x-20*s:.0f} {sy+26*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
        g.append(f'<path d="M {x+9*s:.0f} {sy:.0f} C {x+20*s:.0f} {sy-8*s:.0f} {x+28*s:.0f} {sy-14*s:.0f} {x+34*s:.0f} {sy-18*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    elif pose == 'open':
        g.append(f'<path d="M {x-9*s:.0f} {sy:.0f} C {x-18*s:.0f} {sy-2*s:.0f} {x-24*s:.0f} {sy-8*s:.0f} {x-27*s:.0f} {sy-13*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
        g.append(f'<path d="M {x+9*s:.0f} {sy:.0f} C {x+18*s:.0f} {sy-2*s:.0f} {x+24*s:.0f} {sy-8*s:.0f} {x+27*s:.0f} {sy-13*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    elif pose == 'walk':
        g.append(f'<path d="M {x-9*s:.0f} {sy:.0f} C {x-16*s:.0f} {sy+10*s:.0f} {x-18*s:.0f} {sy+16*s:.0f} {x-16*s:.0f} {sy+22*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
        g.append(f'<path d="M {x+9*s:.0f} {sy:.0f} C {x+18*s:.0f} {sy+2*s:.0f} {x+24*s:.0f} {sy+6*s:.0f} {x+28*s:.0f} {sy+12*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    else:
        g.append(f'<path d="M {x-9*s:.0f} {sy:.0f} C {x-15*s:.0f} {sy+8*s:.0f} {x-18*s:.0f} {sy+16*s:.0f} {x-19*s:.0f} {sy+24*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
        g.append(f'<path d="M {x+9*s:.0f} {sy:.0f} C {x+15*s:.0f} {sy+8*s:.0f} {x+18*s:.0f} {sy+16*s:.0f} {x+19*s:.0f} {sy+24*s:.0f}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    # ben med små fødder
    if pose == 'walk':
        g.append(f'<path d="M {x-4*s:.0f} {by:.0f} C {x-10*s:.0f} {by+8*s:.0f} {x-14*s:.0f} {by+12*s:.0f} {x-16*s:.0f} {by+18*s:.0f} l {-7*s:.0f} 2" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
        g.append(f'<path d="M {x+4*s:.0f} {by:.0f} C {x+8*s:.0f} {by+8*s:.0f} {x+10*s:.0f} {by+12*s:.0f} {x+11*s:.0f} {by+18*s:.0f} l {7*s:.0f} 2" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    else:
        g.append(f'<path d="M {x-6*s:.0f} {by:.0f} L {x-6*s:.0f} {by+16*s:.0f} l {-8*s:.0f} 2 M {x+6*s:.0f} {by:.0f} L {x+6*s:.0f} {by+16*s:.0f} l {8*s:.0f} 2" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    # hoved som æg med luft ned til kroppen
    g.append(f'<ellipse cx="{x}" cy="{y}" rx="{10.5*s:.1f}" ry="{12.5*s:.1f}" fill="#fff" stroke="{INK}" stroke-width="2.6"/>')
    if smile:
        g.append(f'<circle cx="{x-3.5*s:.1f}" cy="{y-1*s:.1f}" r="{1.3*s:.1f}" fill="{INK}"/>')
        g.append(f'<circle cx="{x+3.5*s:.1f}" cy="{y-1*s:.1f}" r="{1.3*s:.1f}" fill="{INK}"/>')
        g.append(f'<path d="M {x-4*s:.1f} {y+4*s:.1f} Q {x} {y+8*s:.1f} {x+4*s:.1f} {y+4*s:.1f}" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    g.append('</g>')
    return '<g filter="url(#rough2)">' + ''.join(g) + '</g>'

def group3(x, y, scale=0.8, seed=5):
    return (stick(x-30, y+8, scale*0.9, 'stand', seed+2, smile=True)
            + stick(x+30, y+8, scale*0.92, 'open', seed+1, smile=True)
            + stick(x, y, scale, 'stand', seed, smile=True))

def bubble(x, y, w, h, tailx, taily, kind='tale'):
    if kind == 'tanke':
        b = f'<ellipse cx="{x+w/2}" cy="{y+h/2}" rx="{w/2}" ry="{h/2}" fill="#fff" stroke="{INK}" stroke-width="2.4"/>'
        dots = f'<circle cx="{tailx}" cy="{taily}" r="4" fill="none" stroke="{INK}" stroke-width="2"/><circle cx="{(tailx+x+w/2)/2:.0f}" cy="{(taily+y+h/2)/2:.0f}" r="6" fill="none" stroke="{INK}" stroke-width="2"/>'
        return f'<g filter="url(#rough2)">{b}{dots}</g>'
    sh = f'<rect x="{x+5}" y="{y+6}" width="{w}" height="{h}" rx="{h/2.6:.0f}" fill="#e2e5ea"/>'
    b = sh + f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2.6:.0f}" fill="#fff" stroke="{INK}" stroke-width="2.4"/>'
    mx = x + w*0.28
    tail = f'<path d="M {mx} {y+h-2} L {tailx} {taily} L {mx+26} {y+h-2}" fill="#fff" stroke="{INK}" stroke-width="2.4"/>'
    return f'<g filter="url(#rough2)">{tail}{b}</g>'

def box(x, y, w, h, fill='#fff'):
    return (f'<g filter="url(#rough)"><rect x="{x+5}" y="{y+6}" width="{w}" height="{h}" rx="6" fill="#e2e5ea"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{INK}" stroke-width="2.6"/></g>')

def banner(x, y, w, h=44):
    body = f'<rect x="{x+5}" y="{y+6}" width="{w}" height="{h}" fill="#e2e5ea"/><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" stroke="{INK}" stroke-width="2.6"/>'
    fl = f'<path d="M {x} {y} l -26 {h/2} l 26 {h/2} Z M {x+w} {y} l 26 {h/2} l -26 {h/2} Z" fill="#fff" stroke="{INK}" stroke-width="2.6"/>'
    return f'<g filter="url(#rough)">{fl}{body}</g>'

def arrow(x1, y1, x2, y2, curve=0):
    mx, my = (x1+x2)/2, (y1+y2)/2 + curve
    ang = math.atan2(y2-my, x2-mx)
    a1 = ang + math.radians(155)
    a2 = ang - math.radians(155)
    hx1, hy1 = x2 + 16*math.cos(a1), y2 + 16*math.sin(a1)
    hx2, hy2 = x2 + 16*math.cos(a2), y2 + 16*math.sin(a2)
    return (f'<g filter="url(#rough2)"><path d="M {x1} {y1} Q {mx} {my} {x2} {y2}" stroke="{INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
            f'<path d="M {hx1:.0f} {hy1:.0f} L {x2} {y2} L {hx2:.0f} {hy2:.0f}" stroke="{INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>')

def flag(x, y, h=64):
    return (f'<g filter="url(#rough2)"><path d="M {x} {y} L {x} {y-h}" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>'
            f'<path d="M {x} {y-h} l 46 10 l -46 12 Z" fill="{ORANGE}" stroke="{INK}" stroke-width="2.4"/></g>')

def skrivelinjer(x, y, w, n, gap=44):
    out = []
    for i in range(n):
        out.append(f'<path d="M {x} {y+i*gap} q {w/2} 4 {w} 0" stroke="{INK}" stroke-width="1.6" fill="none" opacity="0.35" stroke-dasharray="5 6" filter="url(#rough2)"/>')
    return '\n'.join(out)

def canvas(body, seed=3):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<rect width="1200" height="675" fill="#ffffff"/>
{head(seed)}
{body}
</svg>'''


def titel(x, y, tekst, mw, size=34):
    """Overskrift med gul marker og haandskygge bag bogstaverne."""
    return (marker(x-16, y-30, mw, 40)
            + f'<text x="{x+2}" y="{y+3}" font-family={FONT!r} font-size="{size}" font-weight="700" fill="#c9ced6" letter-spacing="0.5">{html.escape(tekst)}</text>'
            + T(x, y, tekst, size, 700))

def badge(x, y, n, r=15):
    return (f'<g filter="url(#rough2)"><circle cx="{x+3}" cy="{y+4}" r="{r}" fill="#dfe3e8"/>'
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="{ORANGE}" stroke="{INK}" stroke-width="2.2"/>'
            f'<text x="{x}" y="{y+6}" font-family={FONT!r} font-size="17" font-weight="700" fill="#fff" text-anchor="middle">{n}</text></g>')

def glimt(x, y, s=1.0):
    p = f'M {x} {y-9*s} Q {x+1.5*s} {y-1.5*s} {x+9*s} {y} Q {x+1.5*s} {y+1.5*s} {x} {y+9*s} Q {x-1.5*s} {y+1.5*s} {x-9*s} {y} Q {x-1.5*s} {y-1.5*s} {x} {y-9*s} Z'
    return f'<g filter="url(#rough2)"><path d="{p}" fill="{GUL}" stroke="{INK}" stroke-width="1.6"/></g>'
