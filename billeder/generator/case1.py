import sys, importlib.util
spec = importlib.util.spec_from_file_location('sketch', 'billeder/generator/sketch.py')
sk = importlib.util.module_from_spec(spec); spec.loader.exec_module(sk)
T, marker, stick, group3, bubble, box, banner, arrow, flag, skrivelinjer, canvas = (
    sk.T, sk.marker, sk.stick, sk.group3, sk.bubble, sk.box, sk.banner, sk.arrow, sk.flag, sk.skrivelinjer, sk.canvas)
titel, badge, glimt = sk.titel, sk.badge, sk.glimt

def case1(blank):
    b = []
    # Titel med markering
    b.append(titel(56, 60, 'TRE MÅNEDER TIL NY SKOLE', 560))
    b.append(T(56, 92, 'TILTRÆDELSE 1. OKTOBER · SELVSTÆNDIG SKOLE 1. JANUAR · CIRKA 100 DAGE', 17))
    b.append(T(1150, 50, 'VONSILD · 2. SAMTALE', 14, 400, 'end'))
    # Vejen (kurvet sti)
    b.append(f'<g filter="url(#rough)"><path d="M 80 560 C 260 460 300 300 470 300 C 640 300 620 480 800 470 C 960 462 1010 330 1080 250" stroke="#1f2937" stroke-width="4" fill="none" stroke-dasharray="1 14" stroke-linecap="round"/></g>')
    b.append(flag(1080, 250))
    b.append(glimt(1122, 205, 0.9))
    b.append(glimt(905, 462, 0.7))
    b.append(T(1078, 292, '1. JANUAR', 17, 700, 'middle'))
    b.append(T(1078, 312, 'SELVSTÆNDIG SKOLE', 11.5, 400, 'middle'))
    # Station 1: LYT (figur med gruppe og taleboble)
    b.append(group3(150, 470, 0.8, seed=11))
    b.append(stick(255, 452, 1.0, 'open', 21))
    b.append(bubble(228, 328, 250, 66, 268, 442))
    if blank:
        b.append(skrivelinjer(250, 358, 206, 2, 32))
    else:
        b.append(T(254, 360, 'HVAD BÆRER JERES', 18, 700))
        b.append(T(254, 384, 'PRAKSIS I DAG?', 18, 700))
    b.append(marker(120, 585, 250, 30))
    b.append(T(132, 607, 'OKTOBER · LYT OG KORTLÆG', 16, 700))
    # Bevar-listen (clipboard)
    b.append(box(60, 240, 150, 120))
    b.append(f'<rect x="105" y="228" width="60" height="22" rx="6" fill="#fff" stroke="#1f2937" stroke-width="2.4" filter="url(#rough2)"/>')
    b.append(T(135, 268, 'BEVAR-', 16, 700, 'middle'))
    b.append(T(135, 288, 'LISTEN', 16, 700, 'middle'))
    if blank:
        b.append(skrivelinjer(78, 312, 118, 2, 36))
    else:
        b.append(T(78, 314, 'DET DER VIRKER', 12.5))
        b.append(T(78, 334, 'FØLGER MED', 12.5))
    # Station 2: RAMMER (hus)
    hx, hy = 470, 300
    b.append(f'<g filter="url(#rough)"><path d="M {hx-70} {hy-40} L {hx} {hy-105} L {hx+70} {hy-40} Z" fill="#fff" stroke="#1f2937" stroke-width="2.8"/><rect x="{hx-58}" y="{hy-40}" width="116" height="86" fill="#fff" stroke="#1f2937" stroke-width="2.8"/></g>')
    if blank:
        b.append(skrivelinjer(hx-44, hy-8, 88, 2, 24))
    else:
        b.append(T(hx, hy-10, 'ROLLER', 15, 700, 'middle'))
        b.append(T(hx, hy+12, 'MANDATER', 15, 700, 'middle'))
        b.append(T(hx, hy+34, 'BESTYRELSE', 15, 700, 'middle'))
    b.append(marker(360, 148, 230, 30))
    b.append(T(372, 170, 'NOVEMBER · RAMMER', 16, 700))
    # Station 3: GEVINSTER (stjerner + glade figurer)
    b.append(stick(790, 545, 0.85, 'walk', 31))
    b.append(stick(830, 550, 0.75, 'open', 32))
    st = lambda x, y, s: f'<g filter="url(#rough2)"><path d="M {x} {y-14*s} L {x+4*s} {y-4*s} L {x+14*s} {y-4*s} L {x+6*s} {y+3*s} L {x+9*s} {y+13*s} L {x} {y+7*s} L {x-9*s} {y+13*s} L {x-6*s} {y+3*s} L {x-14*s} {y-4*s} L {x-4*s} {y-4*s} Z" fill="{sk.GUL}" stroke="#1f2937" stroke-width="2"/></g>'
    b.append(st(880, 480, 1.2)); b.append(st(915, 512, 0.8)); b.append(st(855, 515, 0.7))
    b.append(bubble(840, 380, 250, 62, 872, 470))
    if blank:
        b.append(skrivelinjer(862, 410, 206, 2, 24))
    else:
        b.append(T(866, 410, '2-3 SYNLIGE', 17, 700))
        b.append(T(866, 433, 'FORBEDRINGER', 17, 700))
    b.append(marker(760, 585, 290, 30))
    b.append(T(772, 607, 'DECEMBER · KLAR FØR JUL', 16, 700))
    # Kvitteringspunkter (tjekmærker på vejen)
    for cx, cy, d in ((298, 444, '1/11'), (655, 452, '1/12'), (1005, 335, '1/1')):
        b.append(f'<g filter="url(#rough2)"><circle cx="{cx}" cy="{cy}" r="17" fill="#fff" stroke="#1f2937" stroke-width="2.6"/><path d="M {cx-7} {cy} l 5 6 l 10 -12" stroke="#1f2937" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>')
        b.append(T(cx+24, cy+6, d, 14, 700))
    # Bundbanner
    b.append(banner(330, 622, 540, 42))
    if blank:
        b.append(skrivelinjer(370, 650, 460, 1))
    else:
        b.append(T(600, 650, 'ELEVERNE SKAL MÆRKE RO · IKKE OMSTILLING', 18, 700, 'middle'))
    return canvas('\n'.join(b), seed=4)

open('billeder/case1-100dage-udfyldt.svg', 'w').write(case1(False))
open('billeder/case1-100dage-blank.svg', 'w').write(case1(True))
print('OK case1 grafisk facilitering')
