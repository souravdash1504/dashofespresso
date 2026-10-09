"""Generate consistent, original, editable SVG menu illustrations for Dash of Espresso.
Run: python make_illustrations.py. No external image service or dependency.
"""
from pathlib import Path
out=Path(__file__).parent/'images'
out.mkdir(exist_ok=True)

def illustration(key, bg1, bg2, accent, contents):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="700" height="800" viewBox="0 0 700 800" role="img" aria-label="Illustrated {key.replace('-', ' ')} coffee">
<defs>
  <linearGradient id="bg" x2="1" y2="1"><stop stop-color="{bg1}"/><stop offset="1" stop-color="{bg2}"/></linearGradient>
  <radialGradient id="sun"><stop stop-color="#fff8e9" stop-opacity=".78"/><stop offset="1" stop-color="#fff8e9" stop-opacity="0"/></radialGradient>
  <linearGradient id="glass" x2="1"><stop stop-color="#fff9ea" stop-opacity=".38"/><stop offset=".47" stop-color="#fff9ea" stop-opacity=".06"/><stop offset="1" stop-color="#fff9ea" stop-opacity=".36"/></linearGradient>
  <filter id="blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="24"/></filter>
  <clipPath id="drink"><path d="M234 305 L472 305 L453 618 Q449 650 415 657 L291 657 Q257 649 255 618 Z"/></clipPath>
</defs>
<rect width="700" height="800" fill="url(#bg)"/>
<circle cx="335" cy="255" r="348" fill="url(#sun)"/>
<circle cx="584" cy="119" r="235" fill="#fff7ef" opacity=".085"/>
<circle cx="101" cy="780" r="250" fill="#1f100b" opacity=".09"/>
<path d="M-30 702 C190 636 473 671 730 609 V810 H-30Z" fill="{accent}" opacity=".15"/>
<ellipse cx="351" cy="660" rx="212" ry="35" fill="#150b08" opacity=".22" filter="url(#blur)"/>
{contents}
<text x="45" y="62" font-size="13" font-family="Arial,sans-serif" letter-spacing="4.1" fill="{accent}" opacity=".64">DASH OF ESPRESSO</text>
<g transform="translate(614 50)"><circle r="25" fill="none" stroke="{accent}" opacity=".38"/><path d="M-12 0 H12 M0 -12 V12 M-8 -8 L8 8 M-8 8 L8 -8" stroke="{accent}" stroke-width="1.6" opacity=".75"/></g>
</svg>'''

def glass(content, top=None, extras=''):
    # Iced glass with soft frosted highlights and translucent ice blocks.
    cubes=''.join(f'<rect x="{x}" y="{y}" width="48" height="43" rx="8" transform="rotate({rot} {x+24} {y+22})" fill="#fffdf2" opacity=".19" stroke="#fff9ef" stroke-width="6"/>' for x,y,rot in [(272,370,-16),(395,391,17),(318,458,-22),(399,522,24),(284,549,14)])
    return f'''<ellipse cx="355" cy="668" rx="170" ry="24" fill="#160e0a" opacity=".2"/>
<path d="M229 294 Q222 300 229 360 L246 611 Q249 658 289 667 H417 Q456 659 458 611 L478 358 Q485 294 474 294 Z" fill="#f9f4e9" opacity=".48" stroke="#fff9ed" stroke-width="12"/>
<g clip-path="url(#drink)">{content}{cubes}</g>
<path d="M256 337 Q249 410 269 556" fill="none" stroke="#fffbf0" stroke-width="11" stroke-linecap="round" opacity=".44"/>
<ellipse cx="354" cy="302" rx="126" ry="19" fill="#f9efe5" opacity=".55" stroke="#fff9ec" stroke-width="7"/>
{top or ''}{extras}'''

def clouds(cream='#f8e6cc', dust=False):
    c=f'''<path d="M233 304 C230 289 244 286 255 285 Q251 254 285 250 Q289 213 335 221 Q359 199 389 222 Q430 216 438 249 Q470 243 468 277 Q487 293 472 316 Q406 340 353 318 Q291 341 233 304Z" fill="{cream}" stroke="#fff5e4" stroke-width="7"/>
<path d="M279 267 Q333 239 405 262" stroke="#ffffff" stroke-width="11" fill="none" opacity=".57" stroke-linecap="round"/>
<path d="M289 300 Q355 319 422 298" stroke="#dec8ad" stroke-width="4" fill="none" opacity=".5"/>'''
    if dust:
        c+=''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#60402c" opacity=".66"/>' for x,y,r in [(293,266,3),(319,243,3),(355,259,2),(379,252,4),(405,277,3),(341,286,2),(438,285,2)])
    return c

def affogato(caramel=False):
    # Footed glass dessert dish with 3 vanilla scoops, espresso pour, cocoa / salted caramel finish.
    scoop='''<ellipse cx="345" cy="518" rx="154" ry="35" fill="#27150d" opacity=".17"/>
<path d="M218 389 Q213 523 296 555 H413 Q492 529 489 389" fill="#fffaf0" opacity=".39" stroke="#fff9ed" stroke-width="13"/>
<path d="M233 436 Q267 541 351 540 Q446 536 475 435 Q423 464 353 456 Q284 458 233 436Z" fill="#4e281c" opacity=".78"/>
<path d="M313 544 H394 L388 602 L418 619 H286 L319 602Z" fill="#fff4e4" opacity=".46" stroke="#f3e5d0" stroke-width="6"/>
<ellipse cx="352" cy="619" rx="134" ry="19" fill="#fff1df" opacity=".69"/>
<g stroke="#ead2a9" stroke-width="5">
  <circle cx="292" cy="399" r="66" fill="#f6dfac"/>
  <circle cx="399" cy="395" r="67" fill="#f4ddb1"/>
  <circle cx="346" cy="342" r="72" fill="#fff0c9"/>
</g>
<path d="M266 392 Q284 369 304 388 M364 321 Q349 307 325 319 M408 384 Q432 366 439 401" fill="none" stroke="#fff8df" stroke-width="9" stroke-linecap="round" opacity=".72"/>
<path d="M255 436 Q326 464 375 441 T462 435" fill="none" stroke="#6e3a23" stroke-width="13" stroke-linecap="round" opacity=".82"/>
<path d="M435 258 Q464 301 427 357" fill="none" stroke="#62361f" stroke-width="15" stroke-linecap="round"/>
<path d="M428 352 Q408 363 415 385" fill="none" stroke="#6d3d24" stroke-width="10" stroke-linecap="round"/>'''
    if caramel:
        scoop+='''<path d="M279 366 Q322 390 342 361 T423 360 Q446 389 419 416 Q405 443 390 416 M312 429 Q356 454 381 434" fill="none" stroke="#c77e33" stroke-width="15" stroke-linecap="round"/>
<path d="M284 362 Q323 387 338 362" fill="none" stroke="#f6c177" stroke-width="5" stroke-linecap="round"/>'''
        for x,y in [(324,336),(376,361),(411,400),(277,409),(355,411)]:scoop+=f'<circle cx="{x}" cy="{y}" r="2.8" fill="#fff6e7"/>'
    else:
        for x,y,r in [(280,367,3),(334,341,2),(386,349,3),(428,405,2),(308,425,3),(366,395,2)]:scoop+=f'<circle cx="{x}" cy="{y}" r="{r}" fill="#5b321f" opacity=".75"/>'
    return scoop


def hot_cappuccino():
    # Warm ceramic cup on saucer, silky espresso and milk foam with a simple rosetta.
    return '''
<ellipse cx="350" cy="662" rx="183" ry="25" fill="#352016" opacity=".24"/>
<ellipse cx="351" cy="638" rx="203" ry="34" fill="#f8e7d0" stroke="#fcf4e6" stroke-width="11"/>
<ellipse cx="352" cy="642" rx="153" ry="13" fill="#d6ae87" opacity=".65"/>
<path d="M234 360 Q221 361 231 417 L258 554 Q269 607 341 616 H385 Q454 607 461 554 L486 417 Q497 359 485 357Z" fill="#f9ecdb" stroke="#fff7e8" stroke-width="13"/>
<path d="M481 395 C578 363 573 528 467 508" fill="none" stroke="#faf0df" stroke-width="35"/>
<path d="M481 395 C541 392 549 479 479 483" fill="none" stroke="#b78a68" stroke-width="10"/>
<ellipse cx="357" cy="363" rx="136" ry="47" fill="#e6bc90" stroke="#fff7e8" stroke-width="12"/>
<ellipse cx="357" cy="363" rx="118" ry="37" fill="#9c6140"/>
<path d="M353 380 C310 351 327 328 355 344 C383 327 411 353 357 386
 M356 386 C331 363 345 351 359 363 C376 351 392 371 356 390
 M355 390 Q357 404 359 418" fill="none" stroke="#fff3dd" stroke-width="12" stroke-linecap="round"/>
<path d="M270 460 Q280 546 313 566" fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" opacity=".48"/>
<path d="M251 437 Q277 457 291 454" stroke="#fffdf4" stroke-width="7" opacity=".45" fill="none"/>
<g fill="none" stroke="#f5ddbc" stroke-width="7" stroke-linecap="round" opacity=".66">
<path d="M281 268 Q258 244 278 216"/><path d="M351 269 Q335 241 348 209"/><path d="M426 269 Q413 246 434 218"/>
</g>
'''

# Dedicated visuals: the actual ingredients appear in the artworks, not generic stock cups.
artworks={
 'fridge-cigarette':illustration('fridge-cigarette','#d7c5ac','#5c463f','#34231f',glass('''<rect x="230" y="300" width="250" height="359" fill="#261916"/>
<path d="M233 360 Q354 376 472 339 V304 H229Z" fill="#45281f"/>
<path d="M240 475 Q356 494 462 470" stroke="#b68159" stroke-width="8" fill="none" opacity=".42"/>
<g fill="#ecdcc8" opacity=".45"><circle cx="282" cy="432" r="4"/><circle cx="450" cy="485" r="3"/><circle cx="340" cy="543" r="5"/><circle cx="397" cy="616" r="3"/></g>''',clouds())),
 'classic-affogato':illustration('classic-affogato','#e9d5b2','#a78162','#5a3925',affogato()),
 'salted-caramel-affogato':illustration('salted-caramel-affogato','#eddbbd','#b88c66','#80542e',affogato(caramel=True)),
 'sunset-americano':illustration('sunset-americano','#e4b390','#805348','#6f3e2d',glass('''<rect x="230" y="460" width="250" height="207" fill="#4e2d22"/>
<rect x="230" y="387" width="250" height="78" fill="#bd9670" opacity=".88"/>
<path d="M231 385 Q345 374 473 387 L480 300 H228Z" fill="#f2a442"/>
<path d="M234 471 Q334 451 472 472" stroke="#f6d5aa" stroke-width="8" fill="none" opacity=".5"/>
<g fill="#fff4e1" opacity=".52"><circle cx="299" cy="408" r="4"/><circle cx="376" cy="431" r="3"/><circle cx="431" cy="404" r="5"/></g>''',extras='''<g transform="translate(248 314)"><circle r="66" fill="#ed8e31" stroke="#fff0c8" stroke-width="14"/><circle r="51" fill="#f3b35b"/><circle r="42" fill="none" stroke="#fff3ce" stroke-width="3"/>'''+''.join(f'<path d="M0 0 L{x} {y}" stroke="#fff4ce" stroke-width="4"/>' for x,y in [(0,-42),(35,-23),(35,23),(0,42),(-35,23),(-35,-23)])+'''</g>''')),
 'hot-cappuccino':illustration('hot-cappuccino','#dfcbb4','#8e6951','#5e3d2b',hot_cappuccino()),
 'sunrise-americano':illustration('sunrise-americano','#f9dca6','#c48653','#9a5325',glass('''<rect x="230" y="418" width="250" height="247" fill="#f4a52e"/>
<rect x="230" y="363" width="250" height="71" fill="#f1cd77" opacity=".66"/>
<path d="M227 359 Q315 378 362 361 T480 354 L476 285 H227Z" fill="#52301d"/>
<path d="M236 436 Q361 446 468 417" stroke="#ffdb8b" stroke-width="7" opacity=".52" fill="none"/>''',extras='''<g transform="translate(478 321)"><circle r="66" fill="#ef8a2c" stroke="#ffefbf" stroke-width="14"/><circle r="51" fill="#f7bb4d"/><circle r="43" fill="none" stroke="#fff2c5" stroke-width="3"/>'''+''.join(f'<path d="M0 0 L{n[0]} {n[1]}" stroke="#fff3cb" stroke-width="4"/>' for n in [(0,-42),(36,-21),(36,21),(0,42),(-36,21),(-36,-21)])+'''</g>''')),
 'dark-chocolate-peanut-butter-latte':illustration('dark-chocolate-peanut-butter-latte','#e0c1a0','#896343','#5c3523',glass('''<rect x="230" y="300" width="250" height="363" fill="#ae7957"/>
<path d="M230 324 Q291 307 345 348 T479 335 V289 H229Z" fill="#40251e"/>
<path d="M242 377 Q322 418 454 366" fill="none" stroke="#e2b786" stroke-width="21" opacity=".4"/>
<path d="M257 469 Q335 506 437 451" fill="none" stroke="#563320" stroke-width="15" opacity=".29"/>''',top=clouds('#f1deb9',dust=True))),
}
for name,src in artworks.items():
    (out/(name+'.svg')).write_text(src,encoding='utf-8')
# Preserve the existing jamun illustration but update its small printed mark.
jamun=out/'jamun.svg'
original=jamun.read_text(encoding='utf-8')
jamun.write_text(original.replace('HOME BREW BAR','DASH OF ESPRESSO').replace('letter-spacing="6"','letter-spacing="4.1"'),encoding='utf-8')
# Retain existing illustrated hero + favicon, update hero brand mark.
hero=out/'hero.svg'
hero.write_text(hero.read_text(encoding='utf-8').replace('HOME BREW BAR','DASH OF ESPRESSO').replace('letter-spacing="6"','letter-spacing="4.1"'),encoding='utf-8')
print('Updated 7 illustrations, and refreshed Jamun and hero branding')
