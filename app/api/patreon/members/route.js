import { NextResponse } from 'next/server';

const { patreon } = require('patreon')

const client = patreon(process.env.PATREON_ACCESS_TOKEN);

export { client };

export async function GET(request) {
    // First, grab all patrons
    const campaignFetch = await client('/campaigns/6372515/pledges');
    if (campaignFetch.response.status !== 200) {
        return NextResponse.error('Failed to fetch patrons');
    };

    let members = [];
    let pledges = campaignFetch.store.findAll("pledge");

    pledges.forEach((pledge) => {
        let member = pledge.patron.first_name;
        let tier = pledge.reward.title;

        members.push({
            member: member,
            tier: tier,
        });
    });

    return NextResponse.json({
        members: members,
    });
}
