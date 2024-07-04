import { AppPrismaClient } from '@/src/prisma';
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

    await Promise.all(pledges.map(async (pledge) => {
        let member = pledge.patron.first_name;
        let tier = pledge.reward.title;

        let email = pledge.patron.email;

        // get their mc username using their email
        const user = await AppPrismaClient.member.findUnique({
            where: {
                email: email
            }
        });

        members.push({
            member: member,
            tier: tier,
            mc_username: user ? user.mcUsername ?? false : false
        });
    }));

    return NextResponse.json({
        members: members,
    });
}

export async function POST(request) {
    // This has a json body of an email and a mc username
    const body = await request.json();
    const email = body.email;
    const mcUsername = body.mc_username;
    const secret = body.secret;

    if (secret !== process.env.SECRET_KEY) {
        return NextResponse.json({
            success: false,
            error: 'Invalid secret key'
        });
    }

    // if the user exists, update, otherwise create
    const user = await AppPrismaClient.member.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        await AppPrismaClient.member.update({
            where: {
                email: email
            },
            data: {
                mcUsername: mcUsername
            }
        });
    } else {
        await AppPrismaClient.member.create({
            data: {
                email: email,
                mcUsername: mcUsername
            }
        });
    }

    return NextResponse.json({
        success: true
    });
}
