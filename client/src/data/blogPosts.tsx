import type { ReactNode } from "react";
import { Link } from "wouter";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  image: {
    src: string;
    alt: string;
    credit?: string;
  };
  content: ReactNode;
};

// Internal link helper — keeps prose readable and consistent
const IL = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors">
    {children}
  </Link>
);

// External link helper
const XL = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
  >
    {children}
  </a>
);

export const blogPosts: BlogPost[] = [
  {
    slug: "hurricane-season-freight-prep-gulf-coast",
    title: "Hurricane Season Freight Prep: Contingency Planning for Gulf Coast Cargo",
    excerpt:
      "How Texas shippers, contractors, and port operators can protect freight, protect crews, and keep loads moving when a named storm enters the Gulf.",
    category: "Freight Planning",
    publishedAt: "2026-07-14",
    readMinutes: 8,
    image: {
      src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
      alt: "Gulf Coast port with container cranes at dusk",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          Every June through November, freight teams from Corpus Christi to Beaumont start watching the tropics. A single
          named storm in the Gulf can shut down the Port of Houston, close I-10, and strand loaded trailers at truck
          stops for days. At 4Star Logistics we build hurricane contingency plans with our clients long before the
          season starts — because the difference between a minor delay and a total loss usually comes down to preparation.
        </p>

        <h2>Know your window: the 72-hour rule</h2>
        <p>
          The National Hurricane Center issues tropical storm watches roughly 48 hours before conditions are expected,
          and warnings around 36 hours out. Freight operators need a longer window than that. We work backward from a
          72-hour horizon: once a system is inside that window and pointed at any part of our lane network, dispatch
          shifts into contingency mode. Loads bound for evacuation zones get rerouted, staged inland, or paused
          entirely. You can track active systems directly at the{" "}
          <XL href="https://www.nhc.noaa.gov/">National Hurricane Center</XL>.
        </p>

        <h2>Pre-storm freight decisions</h2>
        <p>
          When a Gulf storm is 72 hours out, we help clients make three calls in order:
        </p>
        <ul>
          <li>
            <strong>Can it move now?</strong> Time-critical loads (medical, food, generator fuel) get accelerated onto
            trucks headed away from the projected cone. Our{" "}
            <IL href="/services">freight management team</IL> works with carriers to prioritize routes that clear the
            impact zone before landfall.
          </li>
          <li>
            <strong>Can it stage safely?</strong> Non-critical freight gets re-consigned to inland yards in San
            Antonio, Dallas, or Oklahoma City. Better a two-day delay than a wrecked trailer.
          </li>
          <li>
            <strong>Can it wait?</strong> Aggregate and project cargo often holds better than it moves during a storm.
            We coordinate with the origin site to keep material staged rather than in transit.
          </li>
        </ul>

        <h2>Break bulk and port cargo: the extra layer</h2>
        <p>
          Port cargo is the hardest category to hurricane-proof. Vessel schedules can shift by a week or more once a
          storm forces the Coast Guard to set Port Condition Zulu. Our{" "}
          <IL href="/services">break bulk and port support team</IL> tracks vessel ETAs against the storm forecast and
          coordinates alternate discharge ports when needed. Historically, cargo bound for Houston has been diverted
          to Freeport, Corpus Christi, or Mobile when Galveston Bay closes — but only if the paperwork is ready in
          advance.
        </p>

        <h2>Communication is the whole game</h2>
        <p>
          During a storm event, we run a single group thread with the shipper, the carrier, the consignee, and our
          dispatch. Every four hours, we push a status update: current truck location, driver rest status, revised ETA,
          and next decision point. This eliminates the "where is my load" panic calls that dominate every hurricane
          week.
        </p>

        <h2>After the storm: getting the network back online</h2>
        <p>
          Post-landfall, the challenge shifts to fuel, road closures, and driver availability. Federal Motor Carrier
          Safety Administration emergency declarations often relax hours-of-service rules for disaster relief loads —
          the current list of active declarations is posted at{" "}
          <XL href="https://www.fmcsa.dot.gov/emergency">FMCSA Emergency Declarations</XL>. We use those windows to get
          relief freight moving fast while normal commercial loads resume as roads reopen.
        </p>

        <h2>Build the plan before you need it</h2>
        <p>
          The best time to write a hurricane freight plan is in April. If you move product through the Gulf Coast and
          you don't have a documented contingency plan for the 2026 season,{" "}
          <IL href="/contact">reach out to our team</IL> or{" "}
          <IL href="/quote">request a planning quote</IL>. We'll walk your lanes with you and build a plan you can
          actually execute when the sky turns green.
        </p>
      </>
    ),
  },

  {
    slug: "reducing-detention-and-demurrage-costs",
    title: "Reducing Detention and Demurrage Costs on Nationwide Freight Lanes",
    excerpt:
      "Detention and demurrage quietly erode freight budgets. Here's how disciplined dispatch, better appointments, and honest carrier relationships cut those charges in half.",
    category: "Cost Control",
    publishedAt: "2026-06-18",
    readMinutes: 7,
    image: {
      src: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
      alt: "Warehouse loading dock with trucks waiting to unload",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          Detention (driver waiting at a facility past free time) and demurrage (containers sitting at a terminal past
          free days) are two of the most preventable costs in domestic freight. In 2025 the American Transportation
          Research Institute pegged the average detention rate at roughly $95 per hour after the first two free hours,
          with some lanes running much higher. Multiply that across a full year of shipments and it becomes real money
          — money that mostly goes away with better process.
        </p>

        <h2>Where the hours actually leak</h2>
        <p>
          When we audit a shipper's detention profile, the same three problems come up over and over:
        </p>
        <ul>
          <li>Appointment windows that are too wide (or ignored on arrival).</li>
          <li>Docks staffed for volume that arrived yesterday, not today.</li>
          <li>Paperwork delays — BOL corrections, missing seals, wrong PO numbers.</li>
        </ul>
        <p>
          None of those get fixed by pressuring the carrier. They get fixed by tightening the operation at both ends.
        </p>

        <h2>The four levers that actually work</h2>
        <p>
          Our <IL href="/services">freight management</IL> team leans on four levers, in order of impact:
        </p>
        <ol>
          <li>
            <strong>Firm appointments with named contacts.</strong> A 4-hour window with no dock contact is a detention
            invoice waiting to happen. We push shippers toward 1-hour windows with a named receiver on-site.
          </li>
          <li>
            <strong>Drop-and-hook where volume justifies it.</strong> For repeat lanes over 30 loads per month, a drop
            trailer program almost always pays for itself in six months. We help clients scope which lanes qualify.
          </li>
          <li>
            <strong>Live tracking with proactive ETAs.</strong> Facilities that get a text 60 minutes before arrival
            can staff the dock. Facilities that get surprised can't.
          </li>
          <li>
            <strong>Documented free time.</strong> If your rate confirmations say "2 hours free" but your carriers
            invoice from arrival, you're paying twice. Standardize the language.
          </li>
        </ol>

        <h2>Demurrage: the port cargo equivalent</h2>
        <p>
          For clients moving <IL href="/services">break bulk or port cargo</IL>, demurrage and per diem are the
          equivalent problem — and the meter runs much faster. A single 40-foot container held past free days at
          Houston or Long Beach can rack up $300 to $500 per day, plus chassis charges. The playbook is the same:
          appointments, tracking, and paperwork. The difference is that at the port, your paperwork also involves
          Customs, the steamship line, and the chassis provider. We build those handoffs into every port cargo
          quote so the meter never starts.
        </p>

        <h2>What the FMCSA is doing about it</h2>
        <p>
          Detention has been on the federal radar for years. The FMCSA's 2024 rulemaking notice on driver detention
          data collection is worth reading if you manage a private fleet or a large shipper program —{" "}
          <XL href="https://www.fmcsa.dot.gov/">see fmcsa.dot.gov</XL> for the latest guidance. Change at the federal
          level is slow, but the data collection is already reshaping how carriers price loyalty lanes.
        </p>

        <h2>The honest conversation</h2>
        <p>
          Some detention is unavoidable. Weather, receiver breakdowns, and unexpected volume happen. What we push our
          clients toward is a clean split: pay carriers fairly and quickly for the detention that's genuinely on the
          shipper side, and eliminate the detention that comes from process failure. Carriers remember which shippers
          play fair. In a tight capacity market — and 2026 is starting to look tight — that memory is worth real
          money in per-load rates.
        </p>
        <p>
          If you'd like us to audit a lane or a full network for detention exposure,{" "}
          <IL href="/contact">get in touch</IL> and we'll set up a review.
        </p>
      </>
    ),
  },

  {
    slug: "heavy-haul-permits-texas-route-surveys",
    title: "Heavy Haul Permits in Texas: Route Surveys, Escorts, and the TxDMV Process",
    excerpt:
      "A field guide to moving oversize and overweight loads across Texas — permits, escorts, curfews, and what actually causes weeks of delay.",
    category: "Heavy Haul",
    publishedAt: "2026-05-20",
    readMinutes: 9,
    image: {
      src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
      alt: "Heavy haul truck with oversize load on a highway at sunset",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          Texas moves more oversize freight than any other state — wind turbine components, refinery vessels,
          construction equipment, prefabricated modular units. Every one of those loads runs through the Texas
          Department of Motor Vehicles' Motor Carrier Division for permitting. Getting that process right can compress
          a two-week lead time into three days. Getting it wrong can add weeks.
        </p>

        <h2>Start with the load, not the truck</h2>
        <p>
          The permit is written against the load dimensions and weight, not the tractor pulling it. We ask clients for
          five numbers before we start any permit work: overall length, overall width, overall height, gross vehicle
          weight, and axle spacings. If any of those change during load-out, the permit is void and we start again.
          One of the most common causes of permit re-work is a tarp or shrink-wrap that adds three inches of height on
          the day of pickup.
        </p>

        <h2>Understanding the permit tiers</h2>
        <p>
          Texas has clear thresholds for what needs a permit and what needs escorts:
        </p>
        <ul>
          <li>
            <strong>Standard oversize permit:</strong> Anything over 8'6" wide, 14' high, 65' long (single vehicle), or
            over legal axle weights.
          </li>
          <li>
            <strong>Superload permit:</strong> Loads over 16' wide, 19' high, 125' long, or 254,300 lbs gross. These
            require route studies and often bridge analysis.
          </li>
          <li>
            <strong>Escort requirements:</strong> Generally trigger at 12' wide (one escort), 14'6" wide (two
            escorts), and 15' high (height pole escort). Rural vs. urban routing affects this.
          </li>
        </ul>
        <p>
          Full requirements are published at the{" "}
          <XL href="https://www.txdmv.gov/motor-carriers/oversize-overweight-permits">TxDMV oversize permit page</XL>.
          Rules change — the annual bulletin is worth reading.
        </p>

        <h2>The route survey: where the real work is</h2>
        <p>
          A permit approves a specific route. On a 14'6" load traveling from Beaumont to Odessa, we may spend a full
          day mapping bridge heights, low overpasses (I-10 has several), narrow shoulders, construction zones, and
          rest area exits. On genuinely oversized loads (16'+ wide, 18'+ high), a physical drive-through with a scout
          vehicle is worth every dollar. Our{" "}
          <IL href="/services">project solutions team</IL> builds route surveys into the quote for anything above
          standard oversize dimensions.
        </p>

        <h2>Curfews and travel restrictions</h2>
        <p>
          Texas restricts oversize movement in most metro areas during rush hours, and permits generally require
          daylight-only travel. Most oversize freight runs sunrise to sunset, no weekends without a specific waiver,
          and no travel on major holidays. Building this into the schedule up front prevents the "we're stuck in
          Waco until Monday" problem that eats project budgets.
        </p>

        <h2>Escorts: hire good ones</h2>
        <p>
          Texas requires certified escorts through the Texas Certified Escort program. A cheap escort is expensive:
          missed low clearances, wrong lane calls, and slow response at intersections all cost more than the escort
          savings. We use a short list of vetted escort companies and won't run an oversize load with an unknown
          escort.
        </p>

        <h2>Coordinating with utilities</h2>
        <p>
          Loads over 17'6" often require utility coordination — power line lifts, traffic signal removals, or
          overhead cable escorts. This is the piece most people underestimate. Utility coordination can add 10 to 21
          days to a permit timeline. Start early.
        </p>

        <h2>What we bring to a heavy haul move</h2>
        <p>
          On heavy haul projects we handle the permit application, the route survey, escort coordination, curfew
          scheduling, and utility notifications — coordinated with the load-out schedule and the receiving job site.
          If you have an oversize move coming up, <IL href="/quote">send us the load dimensions</IL> and we'll build
          the permit and route plan around it.
        </p>
      </>
    ),
  },

  {
    slug: "understanding-freight-class-nmfc-guide",
    title: "Understanding Freight Class: A Shipper's Guide to NMFC Codes",
    excerpt:
      "Freight class errors are one of the fastest ways to blow a shipping budget. Here's how NMFC codes actually work — and how to stop overpaying.",
    category: "LTL Freight",
    publishedAt: "2026-04-22",
    readMinutes: 6,
    image: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      alt: "Palletized freight in a distribution warehouse",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          Every LTL shipment in the United States gets classified under the National Motor Freight Classification —
          the NMFC. That class number, from 50 to 500, drives most of what you pay. Get it right and you save
          20 percent. Get it wrong and you get a reweigh-reclass invoice three weeks later that nobody in your
          accounts payable department knows what to do with.
        </p>

        <h2>The four density-adjacent factors</h2>
        <p>
          The National Motor Freight Traffic Association classifies commodities on four characteristics:
        </p>
        <ul>
          <li><strong>Density</strong> — pounds per cubic foot. This is the dominant factor.</li>
          <li><strong>Stowability</strong> — how easily the freight nests with other freight.</li>
          <li><strong>Handling</strong> — special equipment, fragility, or hazards.</li>
          <li><strong>Liability</strong> — theft target, perishability, damage risk.</li>
        </ul>
        <p>
          The official NMFC guidance and updates are published by the{" "}
          <XL href="https://www.nmfta.org/">National Motor Freight Traffic Association</XL>. If you ship LTL regularly,
          a subscription to ClassIT (their online lookup) is worth the annual fee.
        </p>

        <h2>Density is where most errors happen</h2>
        <p>
          Density = (weight in pounds) ÷ (length × width × height in cubic feet). A palletized load that's 48" × 40"
          × 48" is 53.3 cubic feet. If it weighs 800 pounds, density is 15 pounds per cubic foot — Class 85. If the
          same pallet weighs 400 pounds, density drops to 7.5 lb/ft³ and jumps to Class 150. That's roughly a 40
          percent rate difference on the same freight footprint. Wrapping product bigger than it needs to be is a
          hidden cost of shipping.
        </p>

        <h2>Reweigh and reclass: how carriers catch you</h2>
        <p>
          Every major LTL carrier operates dimensioners — laser or vision systems that measure freight in real time
          as it moves through the terminal. If your BOL says Class 70 and the dimensioner reads Class 92.5, the
          carrier issues a corrected invoice with a reclass fee. We've seen shippers lose 15 to 25 percent of their
          annual LTL budget to reclass alone. The fix is honest measurement at the origin.
        </p>

        <h2>The FAK opportunity</h2>
        <p>
          For shippers with steady LTL volume and a mix of product classes, a Freight All Kinds (FAK) agreement
          collapses the mix into a single blended class. Done right, FAK can save 10 to 15 percent versus classing
          each shipment. Done wrong (blending too broad a range), it costs money. Our{" "}
          <IL href="/services">freight management team</IL> models FAK scenarios against 90 days of client history
          before recommending a target class.
        </p>

        <h2>What to do this quarter</h2>
        <p>
          If you ship LTL and you've never audited your BOL classifications, start with your top 20 items by volume.
          Weigh and measure them accurately, calculate density, look up the correct NMFC item, and update your rate
          confirmations. Nine out of ten shippers save real money in that exercise. If you want help with the audit,{" "}
          <IL href="/contact">reach out</IL> — it's a fast, high-ROI project.
        </p>
      </>
    ),
  },

  {
    slug: "port-of-houston-to-jobsite-break-bulk-guide",
    title: "Port of Houston to Job Site: A Break Bulk Logistics Guide",
    excerpt:
      "Moving break bulk cargo off a Houston pier and out to a Texas job site involves more moving parts than most first-time shippers realize. Here's the sequence.",
    category: "Break Bulk",
    publishedAt: "2026-03-11",
    readMinutes: 8,
    image: {
      src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
      alt: "Port of Houston container terminal with cranes",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          The Port of Houston moves more waterborne tonnage than any port in the United States. A significant share of
          that is break bulk — steel coils, wind components, pipe, project cargo, and heavy machinery that doesn't fit
          inside a container. Getting break bulk from the pier to a Texas job site is a specialized workflow, and most
          delays we see are caused by the same three or four handoffs going wrong.
        </p>

        <h2>Before the vessel arrives</h2>
        <p>
          The work starts weeks before landfall. Our <IL href="/services">port cargo team</IL> coordinates with the
          steamship line, the stevedore, the port authority, and the receiving job site to lock down:
        </p>
        <ul>
          <li>Vessel ETA and berth assignment (subject to Port Coordinator changes).</li>
          <li>Discharge sequence — what comes off first, second, third.</li>
          <li>Free time at the pier before storage charges begin.</li>
          <li>Route and permit status for the outbound moves.</li>
        </ul>
        <p>
          Port operations at Houston are coordinated through{" "}
          <XL href="https://porthouston.com/">Port Houston</XL>, which publishes vessel schedules and current facility
          conditions. It's worth checking daily during your window.
        </p>

        <h2>Discharge day</h2>
        <p>
          Break bulk discharge is slow compared to container work. A vessel with 300 pieces of steel might discharge
          over three or four days. We schedule trucks against the actual discharge sequence — not the manifest order,
          which almost never matches reality. The wrong truck at the wrong hour is expensive: dead time at the pier
          burns detention, and a missed slot pushes the piece to the back of the yard.
        </p>

        <h2>The paperwork chain</h2>
        <p>
          Every piece leaving the pier needs a delivery order from the steamship line, a gate release from the
          terminal, and (for oversized or overweight pieces) a TxDMV permit. Missing any one of those turns a
          scheduled outbound into a wasted trip. We build a single tracker per project that shows the status of every
          piece across all three documents — this is the single biggest improvement most first-time port shippers
          need.
        </p>

        <h2>Overweight and oversize considerations</h2>
        <p>
          A lot of break bulk is either overweight, oversize, or both. Steel plate coils commonly run 40,000 to
          50,000 pounds per piece. Wind turbine blades can push 200 feet in length. Each of those needs a permit,
          appropriate equipment (extendable trailers, jeeps, boosters), and often escort coordination — see our{" "}
          <IL href="/blog/heavy-haul-permits-texas-route-surveys">Texas heavy haul permit guide</IL> for the detail.
        </p>

        <h2>The job site side</h2>
        <p>
          Break bulk delivery is not the end. Job sites need cranes, rigging crews, and staging areas ready when the
          truck arrives. Our <IL href="/services">job site unloading team</IL> coordinates directly with the site
          superintendent so the piece hits the ground where the plan says it should. A truck that has to circle for
          three hours while the site clears a laydown yard is a wasted day.
        </p>

        <h2>Coordination is the whole product</h2>
        <p>
          On a break bulk project, we're really selling coordination — vessel to pier, pier to truck, truck to site,
          site to install. Any weakness in that chain shows up as demurrage, detention, or a missed install date. If
          you have break bulk moving into Houston in the next 90 days,{" "}
          <IL href="/quote">let us build the plan with you</IL> — the earlier we start, the smoother the discharge
          goes.
        </p>
      </>
    ),
  },

  {
    slug: "aggregate-hauling-101-texas",
    title: "Aggregate Hauling 101: Moving Rock, Gravel, and Bulk Materials in Texas",
    excerpt:
      "How Texas contractors keep aggregate supply steady across active job sites — trailer types, pit relationships, ticketing, and the mistakes that eat margin.",
    category: "Aggregate Hauling",
    publishedAt: "2026-02-16",
    readMinutes: 7,
    image: {
      src: "/images/aggregate-hauling.webp",
      alt: "Aggregate hauling truck at a Texas job site",
    },
    content: (
      <>
        <p>
          Aggregate hauling looks simple from the outside — pit to job site, pit to job site, repeat. It stops looking
          simple around load 40, when a job site needs three deliveries an hour, the pit has a two-hour scale queue,
          and one of your trucks just broke down on the way to a batch plant. Keeping aggregate supply steady is a
          discipline. Here's what we've learned coordinating aggregate for road, foundation, and site work across
          Texas.
        </p>

        <h2>Match the trailer to the material and the site</h2>
        <p>
          The right trailer isn't automatic. End dumps move fast and are cheap to run, but they need overhead
          clearance and a firm, level tip pad — bad news on a soft site. Belly dumps place material in windrows,
          which is what grade contractors want on base courses. Side dumps are the flex choice for tight sites and
          soft ground. We match trailer to job site conditions, not just to material.
        </p>

        <h2>Pit relationships beat spot rates</h2>
        <p>
          Aggregate is a relationship business. Pits that know your trucks and your drivers load them faster. Our{" "}
          <IL href="/services">aggregate hauling</IL> team runs regular volume out of specific pits so the queue
          moves. Chasing the spot rate every day loses more in queue time than it saves in per-ton price.
        </p>

        <h2>Ticketing and reconciliation</h2>
        <p>
          Every load generates a scale ticket at the pit and a delivery ticket at the site. Reconciling those two
          weekly (not monthly) catches short loads, missing loads, and over-billed hauls before they become
          arguments. On a 200-load month, a 2 percent ticket discrepancy is real money.
        </p>

        <h2>Weight and permit realities</h2>
        <p>
          Legal weight in Texas is 80,000 pounds gross without a permit. Overweight aggregate loads are common with
          specific commodity permits — the current requirements are on the{" "}
          <XL href="https://www.txdmv.gov/motor-carriers/oversize-overweight-permits">TxDMV permit portal</XL>. Beware
          of pit scales that "round up" — that's your CDL driver's license on the line, not the pit's.
        </p>

        <h2>Dust, spillage, and community impact</h2>
        <p>
          A big aggregate program is visible in the community. Covered loads, cleaned trailers before leaving the
          pit, and honest routing around schools and residential streets keeps neighbors from calling the city. This
          is easy to skip when the schedule is tight — and expensive when a councilperson gets calls about your
          trucks.
        </p>

        <h2>Building capacity ahead of the pour</h2>
        <p>
          Concrete pours and asphalt lays have hard delivery-rate requirements. Under-hauling stalls a paving crew.
          Over-hauling stacks trucks in a queue and burns detention. Our{" "}
          <IL href="/services">project solutions</IL> team pre-builds truck curves against pour schedules so drivers
          arrive as the crew needs them — not before, not after.
        </p>

        <h2>Where we come in</h2>
        <p>
          If you're running a job that needs steady aggregate flow — highway work, subdivision development, foundation
          pours, or industrial site work — <IL href="/quote">get a quote from our team</IL>. We'll size the fleet
          against the schedule and keep the material flowing.
        </p>
      </>
    ),
  },

  {
    slug: "fmcsa-compliance-2026-shipper-guide",
    title: "FMCSA Compliance in 2026: What Every Shipper Should Know",
    excerpt:
      "Broker and carrier compliance rules keep tightening. Here's what shippers need to check on every carrier before a load moves — and why 4Star has always operated to a higher standard.",
    category: "Compliance",
    publishedAt: "2026-01-20",
    readMinutes: 6,
    image: {
      src: "/images/branded-truck-side.webp",
      alt: "Commercial freight truck — bonded and insured operations",
    },
    content: (
      <>
        <p>
          Shipper liability for carrier compliance has expanded significantly in the last few years. Negligent
          selection lawsuits — where a shipper is sued for using an unsafe carrier — have produced verdicts in the tens
          of millions. That's on top of the direct operational cost of a bad carrier: rejected loads, cargo claims,
          insurance disputes, and lane damage. If you tender freight in 2026, carrier vetting is not optional.
        </p>

        <h2>The five things to check on every carrier</h2>
        <p>
          Before a load moves, every carrier we use passes a check on:
        </p>
        <ul>
          <li>
            <strong>Active operating authority.</strong> MC and DOT numbers, both active, matching the entity on the
            insurance certificate. Verified at{" "}
            <XL href="https://safer.fmcsa.dot.gov/">SAFER (safer.fmcsa.dot.gov)</XL>.
          </li>
          <li>
            <strong>Insurance limits.</strong> Auto liability at $1M minimum, cargo at $100K minimum (higher for
            specialized freight), certificate showing 4Star or the shipper as certificate holder.
          </li>
          <li>
            <strong>Safety rating.</strong> Satisfactory or unrated is OK; conditional or unsatisfactory is a hard
            stop.
          </li>
          <li>
            <strong>CSA scores.</strong> Alerts on unsafe driving, HOS compliance, vehicle maintenance, or crash
            indicator trigger additional review.
          </li>
          <li>
            <strong>Out-of-service history.</strong> Vehicle and driver OOS rates above the national average require
            a conversation.
          </li>
        </ul>

        <h2>What's changing at the federal level</h2>
        <p>
          The FMCSA has been active on broker transparency, unified registration, and household goods rules. The
          agency's current rulemaking dashboard is worth a bookmark:{" "}
          <XL href="https://www.fmcsa.dot.gov/regulations">fmcsa.dot.gov/regulations</XL>. The trend line is clearly
          toward more documentation, more electronic verification, and more shipper accountability.
        </p>

        <h2>How 4Star operates</h2>
        <p>
          We're a licensed broker with active MC authority and a full surety bond — the details are on our{" "}
          <IL href="/about">about page</IL>. Every carrier we use is vetted through the checklist above before a
          single load moves, and our compliance data is continuously monitored. When we tender a load, the shipper
          gets a documented paper trail — insurance certificate, safety snapshot, and carrier packet — as part of the
          load record.
        </p>

        <h2>The bigger picture</h2>
        <p>
          Compliance is not a paperwork exercise. It's the difference between a load that arrives clean and a load
          that ends up in a settlement conference. If you're re-evaluating your broker or carrier list for 2026,{" "}
          <IL href="/contact">talk to us</IL> about how we vet carriers — and{" "}
          <IL href="/onboarding">carriers looking to work with us</IL> can start the onboarding process directly on
          our site.
        </p>
      </>
    ),
  },

  {
    slug: "winter-freight-planning-southern-us",
    title: "Winter Freight Planning: Cold-Weather Logistics Across the Southern US",
    excerpt:
      "Southern winters look mild until they don't. What Texas and Gulf State shippers should be doing before every cold snap to keep freight moving.",
    category: "Freight Planning",
    publishedAt: "2025-12-11",
    readMinutes: 7,
    image: {
      src: "/images/cargo-logistics.webp",
      alt: "Freight and cargo logistics operations",
    },
    content: (
      <>
        <p>
          Texas doesn't do winter often. But when a cold snap hits — 2021's Uri, 2022's Elliott, the January 2024
          arctic blast — the freight network can freeze in place for days. Roads close, drivers get stranded, and
          product doesn't move. The shippers who came through those events well were the ones who had a plan on
          October 1, not the ones who tried to build one on January 12.
        </p>

        <h2>What actually breaks in a Southern winter</h2>
        <p>
          The failure modes are different from a Midwest winter. In the South, the main risks are:
        </p>
        <ul>
          <li>Ice on untreated bridges and elevated highways (Texas has thousands of miles of both).</li>
          <li>Fuel gelling in trucks that aren't spec'd for extreme cold.</li>
          <li>Warehouse power outages that stop dock operations.</li>
          <li>Driver availability when local schools close and daycare closes with them.</li>
        </ul>

        <h2>The pre-season checklist</h2>
        <p>
          By November 1, our clients running seasonal-critical freight have:
        </p>
        <ul>
          <li>An identified list of temperature-sensitive lanes and the products moving on them.</li>
          <li>Winter fuel additives specified on carrier requirements for those lanes.</li>
          <li>Alternate origin/destination facilities in case a primary site loses power.</li>
          <li>Escalation contacts on both ends who can make calls at 2 a.m. if needed.</li>
        </ul>

        <h2>Reading the weather right</h2>
        <p>
          The National Weather Service issues Winter Storm Watches 48 hours out and Warnings 24 hours out for the
          South. That's the same window as summer hurricane prep — enough time to make good decisions if you're
          watching. The{" "}
          <XL href="https://www.weather.gov/">National Weather Service</XL> local offices publish decision-support
          briefings that are considerably more useful than commercial weather apps.
        </p>

        <h2>Bridge closures — the Texas-specific issue</h2>
        <p>
          TxDOT tends to close elevated freeway sections (I-35 through downtown Austin, I-45 through downtown
          Houston, all of I-820 in Fort Worth) at the first sign of ice. When that happens, your Dallas–Houston or
          Dallas–Austin lane is effectively closed even if the temperature is 34°F elsewhere. Alternate routes exist
          — we pre-map them into our lane library and load them into dispatch when a system is 48 hours out.
        </p>

        <h2>Communication during an event</h2>
        <p>
          Same rule as hurricane season: one thread, four-hour updates, honest ETAs. Drivers stuck on a closed
          section need to know when the DOT plans to reopen. Our{" "}
          <IL href="/services">freight management team</IL> runs those updates so customers don't have to make
          twelve phone calls to build a picture.
        </p>

        <h2>Building your plan</h2>
        <p>
          If you move product through Texas or the Southeast in winter and you don't have a written cold-weather
          contingency plan, we can help build one. <IL href="/contact">Reach out</IL> and we'll walk your seasonal
          exposure with you.
        </p>
      </>
    ),
  },

  {
    slug: "break-bulk-vs-container-shipping-texas",
    title: "Break Bulk vs. Container Shipping: What Texas Shippers Need to Know",
    excerpt:
      "When containers work, when they don't, and how project cargo shippers decide between break bulk, container, and heavy-lift options.",
    category: "Break Bulk",
    publishedAt: "2025-11-19",
    readMinutes: 7,
    image: {
      src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80",
      alt: "Container ship at a Gulf Coast port terminal",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          The default for most freight is a container — it's fast, standardized, and easy to price. But for a lot of
          the project cargo, industrial equipment, and construction material moving through Texas, containers are the
          wrong answer. Choosing between container and break bulk shipping shapes the entire project schedule and
          cost.
        </p>

        <h2>When containers win</h2>
        <p>
          Containers are almost always the right choice when:
        </p>
        <ul>
          <li>Product fits inside a 20', 40', or 45' box with reasonable margin.</li>
          <li>Product is not extremely heavy relative to its footprint.</li>
          <li>Product benefits from door-to-door sealed movement (electronics, consumer goods).</li>
          <li>Volume supports the container rate structure.</li>
        </ul>

        <h2>When break bulk wins</h2>
        <p>
          Our <IL href="/services">break bulk and port cargo team</IL> steers clients toward break bulk when:
        </p>
        <ul>
          <li>Product is too tall, too long, or too wide to fit inside a standard container.</li>
          <li>Product is too heavy to place inside a container without exceeding gross weight limits.</li>
          <li>Product is a single high-value piece (turbine components, refinery vessels, heavy machinery).</li>
          <li>Handling equipment at destination is set up for direct pier-to-truck, not container unstuffing.</li>
        </ul>

        <h2>Heavy lift — the third option</h2>
        <p>
          Some cargo doesn't fit either mode. Heavy lift vessels are purpose-built to carry single pieces over 100
          tons, using onboard cranes rated for those weights. They're expensive, they're not everywhere, and they
          require serious planning — but for the right piece, they're the only option that works.
        </p>

        <h2>The Houston and Gulf Coast context</h2>
        <p>
          Port Houston handles all three modes, with dedicated terminals for containers, break bulk, and project
          cargo. Barbours Cut and Bayport are the container centers; the general cargo terminals along the Turning
          Basin handle break bulk. The{" "}
          <XL href="https://porthouston.com/">Port Houston</XL> facility map shows the current terminal assignments.
        </p>

        <h2>Cost, not just rate</h2>
        <p>
          Break bulk has a higher per-ton ocean rate than container. But the total landed cost picture can flip when
          you factor in specialized packaging (for containerized versions of oversize items), handling equipment at
          destination, or the risk of damage in a container that isn't sized right. Our{" "}
          <IL href="/services">project solutions</IL> team runs total-landed-cost models against both options on
          project freight — usually the answer is not what the first spreadsheet suggested.
        </p>

        <h2>The right question</h2>
        <p>
          The question isn't "container or break bulk?" — it's "what does this specific piece need, from load-out
          origin to install position?" Once we know that, the mode almost picks itself. If you have project cargo
          coming into Texas in the next two quarters, <IL href="/quote">let us model it with you</IL>.
        </p>
      </>
    ),
  },

  {
    slug: "choose-freight-broker-construction-project",
    title: "How to Choose the Right Freight Broker for Your Construction Project",
    excerpt:
      "A practical checklist for construction PMs, owners, and site supers picking a freight broker to move project cargo, aggregate, and equipment.",
    category: "Project Solutions",
    publishedAt: "2025-10-14",
    readMinutes: 6,
    image: {
      src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
      alt: "Construction site with materials being delivered by truck",
      credit: "Photo via Unsplash",
    },
    content: (
      <>
        <p>
          Construction projects run on freight. Steel, precast, aggregate, equipment, and project cargo all have to
          arrive on schedule, in the right condition, and to the right laydown area. Pick the wrong broker and you get
          missed pours, empty crews, and change orders. Pick the right one and freight becomes a non-issue.
        </p>

        <h2>The seven questions worth asking</h2>
        <p>
          Before you sign a broker up for a project, get honest answers to these seven questions:
        </p>
        <ol>
          <li>
            <strong>Are you licensed and bonded?</strong> Ask for the MC number and verify at{" "}
            <XL href="https://safer.fmcsa.dot.gov/">SAFER</XL>. Ask for the bond and insurance certificates.
          </li>
          <li>
            <strong>Have you moved this class of freight before?</strong> Break bulk, oversize, aggregate, and
            equipment are all different disciplines. Experience in one doesn't equal experience in another.
          </li>
          <li>
            <strong>What's your dispatch coverage?</strong> Construction runs early. If your broker's phone doesn't
            answer at 4:30 a.m., that's your problem at 5.
          </li>
          <li>
            <strong>How do you handle exceptions?</strong> Storms, breakdowns, closed roads — what's the process, and
            who calls whom?
          </li>
          <li>
            <strong>What paperwork will I get?</strong> BOLs, tickets, insurance, delivery confirmations. All of it,
            weekly, in a format your accounting can process.
          </li>
          <li>
            <strong>How do you price?</strong> Straight per-load, per-ton, per-hour, day rate — and are fuel surcharges,
            detention, and layovers clearly stated?
          </li>
          <li>
            <strong>Can I talk to two references on similar projects?</strong> If the answer is no, keep looking.
          </li>
        </ol>

        <h2>What we bring to construction projects</h2>
        <p>
          Our <IL href="/services">project solutions</IL> and{" "}
          <IL href="/services">aggregate hauling</IL> teams routinely support Texas construction projects — road work,
          site development, foundation pours, industrial builds. We build a truck curve against the pour schedule,
          match trailer types to site conditions, and staff dispatch so the phone is answered when the crew is
          working. You can see some of the recent work on our <IL href="/projects">projects page</IL>.
        </p>

        <h2>Onboarding a broker without the pain</h2>
        <p>
          Setting up a new broker relationship for a project typically takes a week of paperwork, insurance
          endorsements, and PO setup. We compress that by doing our part on Day 1 — sending the packet, W-9,
          insurance certificate, and references before you ask. If you're evaluating brokers for a Texas or Gulf
          Coast construction project, <IL href="/contact">reach out</IL> and we'll get you what you need to make a
          fast decision.
        </p>

        <h2>The reality check</h2>
        <p>
          A good freight broker on a construction project is invisible. Materials arrive on time, dispatch is
          responsive, invoices tie out, and the site super never has to think about trucks. That's the standard we
          hold ourselves to — and it's the standard worth demanding from anyone bidding your freight.
        </p>
      </>
    ),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, count);
}
